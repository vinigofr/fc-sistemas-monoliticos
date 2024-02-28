import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./checkStock.dto";

export default class CheckStockUsecase {
  private _productRepository: ProductGateway

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const stockNumber = await this._productRepository.getStock(input.productId);

    return {
      productId: input.productId,
      stockNumber,
    }
  }
}