import Id from "../../@shared/domain/value-object/idValueObject";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const result = await ProductModel.findAll({ raw: true });

    return result.map((product) => new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }))
  }

  async findById(id: string): Promise<Product> {
    const foundProduct = await ProductModel.findOne({ where: { id }, raw: true });

    if (!foundProduct) {
      throw new Error(`product.id.${id}.not.found`);
    }

    return new Product({
      id: new Id(foundProduct.id),
      name: foundProduct.name,
      description: foundProduct.description,
      salesPrice: foundProduct.salesPrice,
    });
  }
}