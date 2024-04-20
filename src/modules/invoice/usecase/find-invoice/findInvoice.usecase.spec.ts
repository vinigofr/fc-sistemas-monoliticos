import Address from "../../../@shared/domain/value-object/addressValueObject";
import Id from "../../../@shared/domain/value-object/idValueObject";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoiceItem.entity";
import FindInvoiceUsecase from "./findInvoice.usecase";
import { FindInvoiceUsecaseInputDto } from "./findInvoice.usecase.dto";

const invoice = new Invoice({
  id: new Id('1'),
  address: new Address({
    city: 'city',
    number: 'number',
    complement: 'complement',
    state: 'state',
    street: 'street',
    zipCode: 'zipCode',
  }),
  document: 'document',
  invoiceItems: [new InvoiceItem({ name: 'name', price: 10 })],
  name: 'name',
  createdAt: new Date(),
})

const mockRepository = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  generate: jest.fn(),
});

const mockRepositoryEmpty = () => ({
  find: jest.fn().mockReturnValue(Promise.resolve(null)),
  generate: jest.fn(),
})

describe('Find Invoice usecase unit tests', () => {
  test('should test find method output', async () => {
    const repository = mockRepository();
    const usecase = new FindInvoiceUsecase(repository);

    const input: FindInvoiceUsecaseInputDto = { id: '1' }
    const result = await usecase.execute(input);

    expect(result).not.toBeNull();
    expect(result.id).toBe(invoice.id.id);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.document).toBe(invoice.document);
    expect(result.items[0].name).toBe(invoice.invoiceItems[0].name);
    expect(result.name).toBe(invoice.name);
    expect(result.createdAt).toEqual(invoice.createdAt);
    expect(result.total).toBe(0);
  })

  test('should test find method output when an error is thrown', async () => {
    const repository = mockRepositoryEmpty();
    const usecase = new FindInvoiceUsecase(repository);

    const input: FindInvoiceUsecaseInputDto = { id: '1' }
    expect(async () => await usecase.execute(input)).rejects.toThrowError('invoice.with.id.1.not.found');
  })
})