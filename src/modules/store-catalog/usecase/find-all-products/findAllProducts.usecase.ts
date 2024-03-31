import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import Products from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import FindAllProductsDto from "./findAllProducts.dto";

export default class FindAllProductsUsecase implements UsecaseInterface {
  private _repository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._repository = productRepository;
  }

  async execute(): Promise<FindAllProductsDto> {
    const products = await this._repository.findAll();
    return {
      products: products.map((product) => {
        return {
          id: product.id.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        }
      })
    };
  }
}