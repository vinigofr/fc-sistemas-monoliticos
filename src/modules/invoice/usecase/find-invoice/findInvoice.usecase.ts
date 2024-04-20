import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUsecaseInputDto, FindInvoiceUsecaseOutputDto } from "./findInvoice.usecase.dto";

export default class FindInvoiceUsecase implements UsecaseInterface {
  private _invoiceRepository: InvoiceGateway;

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository;
  }

  async execute(input: FindInvoiceUsecaseInputDto): Promise<FindInvoiceUsecaseOutputDto> {
    const result = await this._invoiceRepository.find(input.id);

    if (!result) {
      throw new Error(`invoice.with.id.${input.id}.not.found`)
    }

    const invoice: FindInvoiceUsecaseOutputDto = {
      address: {
        city: result.address.city,
        number: result.address.number,
        complement: result.address.complement,
        state: result.address.state,
        street: result.address.street,
        zipCode: result.address.zipCode,
      },
      createdAt: result.createdAt,
      document: result.document,
      items: result.invoiceItems.map(({ id: { id }, name, price }) => ({ id, name, price })),
      id: result.id.id,
      name: result.name,
      total: 0 // TODO: Implement total
    };

    return invoice;
  }

}