import ProductModel from "../repository/product.model";
import SequelizeDatabaseManager from "../../@shared/utils/sequelizeDatabaseManager";
import StoreCatalogFacade from "./storeCatalog.facade";
import StoreCatalogFacadeFactory from "../factory/storeCatalogFacade.factory";

describe('ProductAdmFacade test', () => {
  let sequelize: SequelizeDatabaseManager;

  beforeEach(async () => {
    sequelize = new SequelizeDatabaseManager([ProductModel]);
    await sequelize.sequelizeSync();
  });

  afterEach(async () => {
    await sequelize.sequelizeClose();
  });

  test("should retrieve all products", async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      id: "id",
      name: "name",
      salesPrice: 100,
      description: "description"
    });
    await ProductModel.create({
      id: "id2",
      name: "name2",
      salesPrice: 100,
      description: "description"
    });

    const result = await storeCatalogFacade.findAll();

    expect(result.products).toHaveLength(2);
    expect(result.products[0].id).toBe("id");
    expect(result.products[0].name).toBe("name");
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[0].description).toBe("description");
    expect(result.products[1].id).toBe("id2");
    expect(result.products[1].name).toBe("name2");
    expect(result.products[1].salesPrice).toBe(100);
    expect(result.products[1].description).toBe("description");
  })

  test("should retrieve a product by id", async () => {
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      id: "id",
      name: "name",
      salesPrice: 100,
      description: "description"
    });

    const result = await storeCatalogFacade.find({ id: "id" });

    expect(result.id).toBe("id");
    expect(result.name).toBe("name");
    expect(result.salesPrice).toBe(100);
    expect(result.description).toBe("description");
  })
})