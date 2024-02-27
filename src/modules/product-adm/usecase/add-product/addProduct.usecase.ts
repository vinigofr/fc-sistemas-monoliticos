import Id from "../../../@shared/domain/value-object/idValueObject";
import Product from "../../domain/entity/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./addProduct.dto";

export default class AddProductUsecase {
  private _productRepository: ProductGateway

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const product = new Product({
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      stock: input.stock,
      purchasePrice: input.purchasePrice,
    });

    await this._productRepository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}