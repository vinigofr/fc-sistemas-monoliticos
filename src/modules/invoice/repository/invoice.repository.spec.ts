import Address from "../../@shared/domain/value-object/addressValueObject";
import Id from "../../@shared/domain/value-object/idValueObject";
import AddressModel from "../../@shared/models/address.model";
import SequelizeDatabaseManager from "../../@shared/utils/sequelizeDatabaseManager";
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoiceItem.entity";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import InvoiceItemModel from "./invoiceItem.model";

describe('InvoiceRepository test', () => {
  let sequelize: SequelizeDatabaseManager;

  beforeEach(async () => {
    sequelize = new SequelizeDatabaseManager([
      InvoiceModel,
      InvoiceItemModel,
      AddressModel,
    ]);

    await sequelize.sequelizeSync();
  });

  afterEach(async () => {
    await sequelize.sequelizeClose();
  });

  test('should generate a new invoice and bring it\'s related invoiceItems', async () => {
    const repository = new InvoiceRepository();

    const input = new Invoice({
      id: new Id('invoice1'),
      document: 'document 1',
      name: 'client 1',
      address: new Address({
        city: 'city 1',
        complement: 'complement 1',
        number: '105',
        state: 'state 1',
        street: 'street 1',
        zipCode: 'zipCode 1'
      }),
      invoiceItems: [
        new InvoiceItem({
          id: new Id('invoiceItem1'),
          name: 'item 1',
          price: 10,
        }),
        new InvoiceItem({
          id: new Id('invoiceItem2'),
          name: 'item 2',
          price: 20,
        })
      ],
    });

    const result = await repository.generate(input);

    expect(result).not.toBeUndefined();
    expect(result.id.id).toBe(input.id.id);
    expect(result.document).toBe(input.document);
    expect(result.name).toBe(input.name);
    expect(result.address.city).toBe(input.address.city);
    expect(result.address.complement).toBe(input.address.complement);
    expect(result.address.number).toBe(input.address.number);
    expect(result.address.state).toBe(input.address.state);
    expect(result.address.street).toBe(input.address.street);
    expect(result.address.zipCode).toBe(input.address.zipCode);
    expect(result.invoiceItems.length).toBe(2);
    expect(result.invoiceItems[0].id.id).toBe(input.invoiceItems[0].id.id);
    expect(result.invoiceItems[0].name).toBe(input.invoiceItems[0].name);
    expect(result.invoiceItems[0].price).toBe(input.invoiceItems[0].price);
    expect(result.invoiceItems[1].id.id).toBe(input.invoiceItems[1].id.id);
    expect(result.invoiceItems[1].name).toBe(input.invoiceItems[1].name);
    expect(result.invoiceItems[1].price).toBe(input.invoiceItems[1].price);
  });

  test('should find invoice by id', async () => {
    const repository = new InvoiceRepository();
    const date = new Date();

    const { dataValues: createdAddressData } = await AddressModel.create({
      id: 'addressId',
      street: 'street',
      city: 'city',
      zipCode: 'zipCode',
      number: 'number',
      complement: 'complement',
      state: 'state',
    }, { raw: true });

    const { dataValues: createdData } = await InvoiceModel.create({
      id: '123',
      name: 'name',
      document: 'document',
      invoiceItems: [{
        id: '1',
        name: 'item 1',
        price: 1,
      }],
      createdAt: date,
      updatedAt: date,
      addressId: createdAddressData.id,
    }, {
      include: [{ association: InvoiceModel.associations.invoiceItems }],
    }
    );

    const { invoiceItems } = createdData;

    const result = await repository.find('123');

    expect(result).not.toBeUndefined();
    expect(result.id.id).toBe(createdData.id);
    expect(result.name).toBe(createdData.name);
    expect(result.document).toBe(createdData.document);
    expect(result.invoiceItems.length).toBe(1);
    expect(result.invoiceItems[0].id.id).toBe(invoiceItems[0].dataValues.id);
    expect(result.invoiceItems[0].name).toBe(invoiceItems[0].dataValues.name);
    expect(result.invoiceItems[0].price).toBe(invoiceItems[0].dataValues.price);
    expect(result.address.city).toBe('city');
    expect(result.address.complement).toBe('complement');
    expect(result.address.number).toBe('number');
    expect(result.address.state).toBe('state');
    expect(result.address.street).toBe('street');
    expect(result.address.zipCode).toBe('zipCode');
  });

  test('should\'not find invoice if does not exist', async () => {
    const repository = new InvoiceRepository();
    await expect(async () => await repository.find('1')).rejects.toThrow('invoice.with.id.1.not.found');
  });
});