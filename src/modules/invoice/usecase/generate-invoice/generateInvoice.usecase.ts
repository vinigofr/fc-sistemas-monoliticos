import Address from "../../../@shared/domain/value-object/addressValueObject";
import Id from "../../../@shared/domain/value-object/idValueObject";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoiceItem.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUsecaseInputDto, GenerateInvoiceUsecaseOutputDto } from "./gererateInvoice.usecase.dto";

export default class GenerateInvoiceUsecase implements UsecaseInterface {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: GenerateInvoiceUsecaseInputDto): Promise<GenerateInvoiceUsecaseOutputDto> {
    const invoiceInput = new Invoice({
      address: new Address({
        city: input.city,
        number: input.number,
        complement: input.complement,
        state: input.state,
        street: input.street,
        zipCode: input.zipCode,
      }),
      document: input.document,
      invoiceItems: input.items.map(({ id, name, price }) => new InvoiceItem({ id: new Id(id), name, price })),
      name: input.name,
      createdAt: new Date(),
    });

    const gereratedInvoiceOutput = await this._invoiceRepository.generate(invoiceInput);

    const invoiceOutput: GenerateInvoiceUsecaseOutputDto = {
      city: gereratedInvoiceOutput.address.city,
      number: gereratedInvoiceOutput.address.number,
      complement: gereratedInvoiceOutput.address.complement,
      state: gereratedInvoiceOutput.address.state,
      street: gereratedInvoiceOutput.address.street,
      zipCode: gereratedInvoiceOutput.address.zipCode,
      document: gereratedInvoiceOutput.document,
      items: gereratedInvoiceOutput.invoiceItems.map(({ id: { id }, name, price }) => ({ id, name, price })),
      id: gereratedInvoiceOutput.id.id,
      name: gereratedInvoiceOutput.name,
      total: gereratedInvoiceOutput.total,
    };

    return invoiceOutput;
  }

}