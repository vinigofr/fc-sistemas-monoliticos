import SequelizeDatabaseManager from "../../@shared/utils/sequelizeDatabaseManager";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe('ProductRepository test', () => {
  let sequelize: SequelizeDatabaseManager;

  beforeEach(async () => {
    sequelize = new SequelizeDatabaseManager([ProductModel]);
    await sequelize.sequelizeSync();
  });

  afterEach(async () => {
    await sequelize.sequelizeClose();
  });

  test("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "name",
      description: "description",
      salesPrice: 100,
    });

    await ProductModel.create({
      id: "2",
      name: "name 2",
      description: "description 2",
      salesPrice: 200,
    });

    const productRepository = new ProductRepository();

    const result = await productRepository.findAll();
    console.log({ result })

    expect(result.length).toBe(2);
    expect(result[0].id.id).toBe("1");
    expect(result[0].name).toBe("name");
    expect(result[0].description).toBe("description");
    expect(result[0].salesPrice).toBe(100);
    expect(result[1].id.id).toBe("2");
    expect(result[1].name).toBe("name 2");
    expect(result[1].description).toBe("description 2");
    expect(result[1].salesPrice).toBe(200);
  })
});