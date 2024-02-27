import Id from "../../@shared/domain/value-object/idValueObject";
import Product from "../domain/entity/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductGateway {
  async add(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  async find(id: string): Promise<Product> {
    const foundProduct = await ProductModel.findOne({ where: { id }, raw: true });

    if (!foundProduct) {
      throw new Error(`product.id.${id}.not.found`);
    }

    const product = new Product({
      id: new Id(foundProduct.id),
      name: foundProduct.name,
      description: foundProduct.description,
      purchasePrice: foundProduct.purchasePrice,
      stock: foundProduct.stock,
      createdAt: foundProduct.createdAt,
      updatedAt: foundProduct.updatedAt,
    });


    return product;
  }
}