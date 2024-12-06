import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto
} from "./invoiceDto.facade.interface";
import InvoiceFacadeInterface from "./invoiceFacade.interface";

interface UsecaseProps {
  findInvoiceUsecase: UsecaseInterface;
  generateInvoiceUsecase: UsecaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findInvoiceUsecase: UsecaseInterface;
  private _generateInvoiceUsecase: UsecaseInterface;

  constructor(usecasesProps: UsecaseProps) {
    this._findInvoiceUsecase = usecasesProps.findInvoiceUsecase;
    this._generateInvoiceUsecase = usecasesProps.generateInvoiceUsecase;
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findInvoiceUsecase.execute(input);
  }

  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateInvoiceUsecase.execute(input);
  }
}