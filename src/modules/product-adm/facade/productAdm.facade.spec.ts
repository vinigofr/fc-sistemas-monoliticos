import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/productAdmFacade.factory";

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
    const productAdmFacade = ProductAdmFacadeFactory.create();

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