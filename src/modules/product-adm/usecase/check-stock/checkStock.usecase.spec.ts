import { CheckStockInputDto } from "./checkStock.dto";
import CheckStockUsecase from "./checkStock.usecase";

const MockRepository = () => ({
  getStock: jest.fn().mockImplementation((productId) => 150),
  find: jest.fn(),
  add: jest.fn(),
})

describe('checkStock usecase unit test', () => {
  test('should retrieve stock by productId', async () => {
    // Repositório
    const productRepository = MockRepository();

    // Usecase
    const usecase = new CheckStockUsecase(productRepository);

    // input
    const input: CheckStockInputDto = {
      productId: "1",
    }

    // output
    const stockOutputDto = await usecase.execute(input)

    // assertion
    expect(productRepository.getStock).toHaveBeenCalled();
    expect(stockOutputDto.productId).toBeDefined();
    expect(stockOutputDto.productId).toBe("1")
    expect(stockOutputDto.stockNumber).toBeDefined();
    expect(stockOutputDto.stockNumber).toBe(150);
  })
})