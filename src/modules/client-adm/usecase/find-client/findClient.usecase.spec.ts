import Id from "../../../@shared/domain/value-object/idValueObject";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./findClient.usecase";

const client = new Client({
  id: new Id('1'),
  address: 'address',
  email: 'x@x.com',
  name: 'John Doe',
  city: 'City',
  complement: 'Complement',
  document: 'Doc',
  number: '12',
  state: 'MA',
  street: 'Rua',
  zipCode: '123456-789',
});

const mockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(new Promise(resolve => resolve(client)))
});

const mockRepositoryEmpty = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(null))
})

describe('Find Client Usecase unit test', () => {
  test('should find a client by id', async () => {
    const repository = mockRepository();
    const usecase = new FindClientUsecase(repository);

    const input = {
      id: '1',
    }

    const result = await usecase.execute(input);
    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(client.id.id);
    expect(result.address).toBe(client.address);
    expect(result.email).toBe(client.email);
    expect(result.name).toBe(client.name);
    expect(result.name).toBe(client.name)
    expect(result.city).toBe(client.city)
    expect(result.complement).toBe(client.complement)
    expect(result.document).toBe(client.document)
    expect(result.number).toBe(client.number)
    expect(result.state).toBe(client.state)
    expect(result.street).toBe(client.street)
    expect(result.zipCode).toBe(client.zipCode)
  });

  test('should throw an error when a client is not found', async () => {
    const repository = mockRepositoryEmpty();
    const usecase = new FindClientUsecase(repository);

    expect(async () => await usecase.execute({ id: '1' })).rejects.toThrowError();
    expect(repository.find).toHaveBeenCalled();
  });
});