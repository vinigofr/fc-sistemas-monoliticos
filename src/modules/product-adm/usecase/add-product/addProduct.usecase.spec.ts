import { AddProductInputDto } from "./addProduct.dto";
import AddProductUsecase from "./addProduct.usecase";

const MockRepository = () => ({
  add: jest.fn(), find: jest.fn(), getStock: jest.fn()
})

describe('addProduct usecase unit test', () => {
  test('should add a product', async () => {
    // Repositório
    const productRepository = MockRepository();
    // Em um caso hipotético, com a utilização ;de um repositório que implemente
    // o ProductGateway, poderíamos utilizar para qu;alquer coisa desde criar
    // um produto no banco de dados até mesmo escrever em um bloco de notas.;
    // Tudo dependeria do repositório implementado. Ele obrigatoriamente
    // deveria implementar a interface ProductGateway para a finalidade

    // Usecase
    const usecase = new AddProductUsecase(productRepository);

    // input
    const input: AddProductInputDto = {
      name: 'Product 1',
      description: 'Description',
      purchasePrice: 100,
      stock: 100
    }

    // output
    const productDtoOutput = await usecase.execute(input)

    // assertion
    expect(productRepository.add).toHaveBeenCalled();
    expect(productDtoOutput.id).toBeDefined();
    expect(productDtoOutput.name).toBe(input.name);
    expect(productDtoOutput.description).toBe(input.description);
    expect(productDtoOutput.purchasePrice).toBe(input.purchasePrice);
    expect(productDtoOutput.stock).toBe(input.stock);
  })
})