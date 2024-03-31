import Id from "../../@shared/domain/value-object/idValueObject";
import SequelizeDatabaseManager from "../../@shared/utils/sequelizeDatabaseManager";
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe('ProductRepository test', () => {
  let sequelize: SequelizeDatabaseManager;

  beforeEach(async () => {
    sequelize = new SequelizeDatabaseManager([ClientModel]);
    await sequelize.sequelizeSync();
  });

  afterEach(async () => {
    await sequelize.sequelizeClose();
  });

  test('should create a new client', async () => {
    const repository = new ClientRepository();

    const input = new Client({
      id: new Id('1'),
      address: 'address 105',
      email: 'x@x.com',
      name: 'client 1'
    })

    const result = await repository.add(input);

    expect(result).toBeUndefined();
    expect(await ClientModel.count()).toBe(1);
  });

  test('should find a client', async () => {
    const repository = new ClientRepository();

    const input = {
      id: '1',
      address: 'address 105',
      email: 'x@x.com',
      name: 'client 1',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await ClientModel.create(input);

    const result = await repository.find('1');
    expect(result.id.id).toBe(input.id);
    expect(result.address).toBe(input.address);
    expect(result.email).toBe(input.email);
    expect(result.name).toBe(input.name);
    expect(new Date(result.createdAt)).toEqual(input.createdAt);
    expect(new Date(result.updatedAt)).toEqual(input.updatedAt);
  });
})