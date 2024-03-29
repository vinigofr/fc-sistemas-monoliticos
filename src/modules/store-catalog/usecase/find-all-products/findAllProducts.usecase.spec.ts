import Id from "../../../@shared/domain/value-object/idValueObject";
import Product from "../../domain/product.entity";
import FindAllProductsUsecase from "./findAllProducts.usecase";

const product = new Product({
  description: 'description',
  id: new Id('1'),
  salesPrice: 1,
  name: 'name',
});

const product2 = new Product({
  description: 'description2',
  id: new Id('2'),
  salesPrice: 2,
  name: 'name2',
});

const mockRepository = () => ({
  findById: jest.fn().mockResolvedValue(Promise.resolve(product)),
  findAll: jest.fn().mockResolvedValue(Promise.resolve([product, product2])),
});

describe('find all products usecase unit tests', () => {
  test('should find all products', async () => {
    const repository = mockRepository();
    const usecase = new FindAllProductsUsecase(repository);

    const { products } = await usecase.execute();
    expect(repository.findAll).toHaveBeenCalled();

    expect(products).toHaveLength(2);
    expect(products[0].id).toBe(product.id.id);
    expect(products[0].name).toBe(product.name);
    expect(products[0].description).toBe(product.description);
    expect(products[0].salesPrice).toBe(product.salesPrice);
    expect(products[1].id).toBe(product2.id.id);
    expect(products[1].name).toBe(product2.name);
    expect(products[1].description).toBe(product2.description);
    expect(products[1].salesPrice).toBe(product2.salesPrice);
  });
});