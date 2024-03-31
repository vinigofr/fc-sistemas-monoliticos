import AddClientUsecase from "./addClient.usecase";

const mockRepository = () => ({
  add: jest.fn(),
  find: jest.fn()
});

describe('Add Client Usecase unit test', () => {
  test('should add a client', async () => {
    const repository = mockRepository();
    const usecase = new AddClientUsecase(repository);

    const input = {
      name: 'John Doe',
      email: 'x@x.com',
      address: 'address 105'
    }

    const result = await usecase.execute(input);
    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.address).toBe(input.address);
    expect(result.email).toBe(input.email);
    expect(result.name).toBe(input.name);
  });
});