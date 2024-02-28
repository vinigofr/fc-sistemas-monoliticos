import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/addProduct.usecase";
import ProductAdmFacade from "./productAdm.facade";

describe('ProductAdmFacade test', () => {
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
  });

  test("should create a product", async () => {
    const productRepository = new ProductRepository();
    const addProductUsecase = new AddProductUsecase(productRepository);

    const productAdmFacade = new ProductAdmFacade({
      addProductUsecase,
      checkStockUsecase: undefined,
    });

    const input = {
      id: "1",
      name: "name",
      purchasePrice: 100,
      stock: 100,
      description: "description"
    }

    await productAdmFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: input.id }, raw: true });

    expect(product.name).toBe(input.name)
  })
})