import Id from "../../../@shared/domain/value-object/idValueObject";
import Product from "../../domain/product.entity";
import FindProductUsecase from "./findProduct.usecase";

const product = new Product({
  description: 'description',
  id: new Id('1'),
  salesPrice: 1,
  name: 'name',
});

const mockRepository = () => ({
  findById: jest.fn().mockResolvedValue(Promise.resolve(product)),
  findAll: jest.fn().mockResolvedValue(Promise.resolve([product])),
});

const mockRepositoryEmpty = () => ({
  findById: jest.fn().mockResolvedValue(Promise.resolve(null)),
  findAll: jest.fn().mockResolvedValue(Promise.resolve([])),
});

describe('find product usecase unit tests', () => {
  test('should find a product', async () => {
    const repository = mockRepository();
    const usecase = new FindProductUsecase(repository);

    const { id, name, description, salesPrice } = await usecase.execute({ id: product.id.id });
    expect(repository.findById).toHaveBeenCalled();

    expect(id).toBe(product.id.id);
    expect(name).toBe(product.name);
    expect(description).toBe(product.description);
    expect(salesPrice).toBe(product.salesPrice);
  });

  test('should throw an error when product does not exist', async () => {
    const repository = mockRepositoryEmpty();
    const usecase = new FindProductUsecase(repository);

    expect(async () => await usecase.execute({ id: '1' }))
      .rejects
      .toThrowError(new Error('product.id.1.not.found'));
  });
});