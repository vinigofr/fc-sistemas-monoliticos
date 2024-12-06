import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUsecase from "../usecase/find-invoice/findInvoice.usecase";
import GenerateInvoiceUsecase from "../usecase/generate-invoice/generateInvoice.usecase";



export default class InvoiceFacadeFactory {
  static create(): InvoiceFacade {
    const repository = new InvoiceRepository();
    const findInvoiceUsecase = new FindInvoiceUsecase(repository);
    const generateInvoiceUsecase = new GenerateInvoiceUsecase(repository);

    return new InvoiceFacade({ findInvoiceUsecase, generateInvoiceUsecase })
  }
}