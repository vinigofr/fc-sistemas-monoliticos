import SequelizeDatabaseManager from "../../@shared/utils/sequelizeDatabaseManager";
import ClientFacadeFactory from "../factory/clientFacade.factory";
import ClientModel from "../repository/client.model";
import { AddClientFacadeInputDto } from "./clientDto.facade.interface";

describe('Client facade unit tests', () => {
  let sequelize: SequelizeDatabaseManager;

  beforeEach(async () => {
    sequelize = new SequelizeDatabaseManager([ClientModel]);
    await sequelize.sequelizeSync();
  });

  afterEach(async () => {
    await sequelize.sequelizeClose();
  });

  test('should create a client', async () => {
    const clientFacade = ClientFacadeFactory.create();

    const input = {
      id: '123',
      address: 'Rua 1',
      email: 'x@x.com',
      name: 'Client 1',
      city: 'Presidente Dutra',
      complement: 'Presidente Dutra',
      document: '123456789',
      number: '123',
      state: 'MA',
      street: 'Rua',
      zipCode: '123456-789'
    }

    await clientFacade.add(input);

    const result = await ClientModel.findOne({
      where: { id: input.id },
      raw: true
    });

    expect(result).not.toBeNull();
    expect(result.id).toBe(input.id);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
    expect(result.address).toBe(input.address);
    expect(result.email).toBe(input.email);
    expect(result.name).toBe(input.name);
    expect(result.city).toBe(input.city);
    expect(result.complement).toBe(input.complement);
    expect(result.document).toBe(input.document);
    expect(result.number).toBe(input.number);
    expect(result.state).toBe(input.state);
    expect(result.street).toBe(input.street);
    expect(result.zipCode).toBe(input.zipCode);

  });

  test('should retrieve a client by id', async () => {
    await ClientModel.create({
      id: '123',
      address: 'Rua 1',
      email: 'x@x.com',
      name: 'Client 1',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const clientFacade = ClientFacadeFactory.create();

    const result = await clientFacade.find({ id: '123' });

    expect(result).not.toBeNull();
    expect(result.id).toBe('123');
    expect(result.address).toBe('Rua 1');
    expect(result.email).toBe('x@x.com');
  });
})