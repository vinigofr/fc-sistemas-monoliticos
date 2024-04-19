import Address from "../../@shared/domain/value-object/addressValueObject";
import Id from "../../@shared/domain/value-object/idValueObject";
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
    })

    const result = await repository.generate(input);

    expect(result).not.toBeUndefined();
    expect(result.id.id).toBe(input.id.id);
    expect(result.document).toBe(input.document);
    expect(result.name).toBe(input.name);
    expect(result.address).toBeDefined();
    expect(result.invoiceItems.length).toBe(2);
    expect(result.invoiceItems[0].id.id).toBe(input.invoiceItems[0].id.id);
    expect(result.invoiceItems[0].name).toBe(input.invoiceItems[0].name);
    expect(result.invoiceItems[0].price).toBe(input.invoiceItems[0].price);
    expect(result.invoiceItems[1].id.id).toBe(input.invoiceItems[1].id.id);
    expect(result.invoiceItems[1].name).toBe(input.invoiceItems[1].name);
    expect(result.invoiceItems[1].price).toBe(input.invoiceItems[1].price);
  });
});