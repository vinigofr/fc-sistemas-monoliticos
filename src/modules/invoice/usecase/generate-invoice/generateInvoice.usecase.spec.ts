import Address from "../../../@shared/domain/value-object/addressValueObject";
import Id from "../../../@shared/domain/value-object/idValueObject";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoiceItem.entity";
import GenerateInvoiceUsecase from "./generateInvoice.usecase";
import { GenerateInvoiceUsecaseInputDto } from "./gererateInvoice.usecase.dto";

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
  find: jest.fn(),
  generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
});


describe('Generate Invoice usecase unit tests', () => {
  test('should test generate method output', async () => {
    const repository = mockRepository();
    const usecase = new GenerateInvoiceUsecase(repository);

    const input: GenerateInvoiceUsecaseInputDto = {
      complement: 'complement',
      zipCode: 'zipCode',
      number: 'number',
      street: 'street',
      state: 'state',
      city: 'city',
      document: 'document',
      name: 'name',
      items: [{ id: '1', name: 'name', price: 10 }],
    }

    const result = await usecase.execute(input);

    expect(result).not.toBeNull();
    expect(result.id).toBe(invoice.id.id);
    expect(result.city).toBe(invoice.address.city);
    expect(result.number).toBe(invoice.address.number);
    expect(result.complement).toBe(invoice.address.complement);
    expect(result.state).toBe(invoice.address.state);
    expect(result.street).toBe(invoice.address.street);
    expect(result.zipCode).toBe(invoice.address.zipCode);
    expect(result.document).toBe(invoice.document);
    expect(result.items[0].name).toBe(invoice.invoiceItems[0].name);
    expect(result.name).toBe(invoice.name);
    expect(result.total).toBe(10);
  })
})
