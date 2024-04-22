import SequelizeDatabaseManager from "../../@shared/utils/sequelizeDatabaseManager";
import InvoiceFacadeFactory from "../factory/invoice.factory";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoiceItem.model";

describe('Invoice facade unit tests', () => {
  let sequelize: SequelizeDatabaseManager;

  beforeEach(async () => {
    sequelize = new SequelizeDatabaseManager([InvoiceModel, InvoiceItemModel]);
    await sequelize.sequelizeSync();
  });

  afterEach(async () => {
    await sequelize.sequelizeClose();
  });

  test('should generate an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create();

    const input = {
      name: 'name',
      document: 'document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
      items: [{ id: 'id', name: 'name', price: 10 }]
    }

    const result = await invoiceFacade.generate(input);

    expect(result).not.toBeNull();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].id).toBe(input.items[0].id);
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
    expect(result.total).toBe(10);
  });

  test('should find an invoice by id', async () => {
    await InvoiceModel.create({
      id: '123',
      name: 'name',
      document: 'document',
      invoiceItems: [{
        id: '1',
        name: 'item 1',
        price: 100,
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      include: [{ association: InvoiceModel.associations.invoiceItems }],
    }
    );

    const clientFacade = InvoiceFacadeFactory.create();

    const result = await clientFacade.find({ id: '123' });

    expect(result).not.toBeNull();
    expect(result.id).toBe('123');
    expect(result.name).toBe('name');
    expect(result.document).toBe('document');
    expect(result.address).toBeDefined();
    expect(result.items).toHaveLength(1);
  });
})