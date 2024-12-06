import AddClientUsecase from "./addClient.usecase";
import { AddClientInputDto } from "./addClient.usecase.dto";

const mockRepository = () => ({
  add: jest.fn(),
  find: jest.fn()
});

describe('Add Client Usecase unit test', () => {
  test('should add a client', async () => {
    const repository = mockRepository();
    const usecase = new AddClientUsecase(repository);

    const input: AddClientInputDto = {
      name: 'John Doe',
      email: 'x@x.com',
      address: 'address 105',
      city: 'Presidente Dutra',
      complement: 'Complemento',
      document: '12345678',
      number: '123',
      state: 'MA',
      street: 'Rua',
      zipCode: '123456-789',
    }

    const result = await usecase.execute(input);
    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.address).toBe(input.address);
    expect(result.email).toBe(input.email);
    expect(result.name).toBe(input.name);
  });
});