import { Sequelize } from "sequelize-typescript"
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";
import Product from "../domain/entity/product.entity";
import Id from "../../@shared/domain/value-object/idValueObject";

describe('ProductRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  })

  test('should create a product', async () => {
    const productRepository = new ProductRepository();

    const product = new Product({
      id: new Id("1"),
      description: 'description',
      name: 'name',
      purchasePrice: 100,
      stock: 120,
    });

    // Create a product
    await productRepository.add(product);

    // Find a product
    const productDb = await ProductModel.findOne({
      where: { id: product.id.id },
      raw: true,
    });

    expect(product.id.id).toEqual(productDb.id)
    expect(product.name).toEqual(productDb.name)
    expect(product.description).toEqual(productDb.description)
  });

  test('should retrieve a product by id', async () => {
    const productRepository = new ProductRepository();

    const product = new Product({
      id: new Id("1"),
      description: 'description',
      name: 'name',
      purchasePrice: 100,
      stock: 120,
    });

    // Create a product
    await ProductModel.create({
      id: product.id.id,
      description: product.description,
      name: product.name,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Find a product
    const foundProduct = await productRepository.find(product.id.id);


    expect(product.id.id).toEqual(foundProduct.id.id)
    expect(product.name).toEqual(foundProduct.name)
    expect(product.description).toEqual(foundProduct.description)
  });

  test('should throw an error if a product is not found', async () => {
    const productRepository = new ProductRepository();

    const id = "500"

    // Find a product
    await expect(
      async () => await productRepository
        .find(id)).rejects.toThrow(`product.id.${id}.not.found`)
  });

  test('should retrieve a stock by product id', async () => {
    const productRepository = new ProductRepository();

    const product = new Product({
      id: new Id("1"),
      description: 'description',
      name: 'name',
      purchasePrice: 100,
      stock: 120,
    });

    // Create a product
    await ProductModel.create({
      id: product.id.id,
      description: product.description,
      name: product.name,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Find a product
    const stock = await productRepository.getStock(product.id.id);
    expect(stock).toEqual(product.stock)
  });
})