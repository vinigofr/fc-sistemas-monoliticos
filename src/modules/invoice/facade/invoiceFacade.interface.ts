import { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoiceDto.facade.interface"

export default interface InvoiceFacadeInterface {
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>
  generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>
}