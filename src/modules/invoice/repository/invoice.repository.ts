import Id from "../../@shared/domain/value-object/idValueObject";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItem from "../domain/invoiceItem.entity";
import InvoiceItemModel from "./invoiceItem.model";
import Invoice from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<Invoice> {
    const createdData = await InvoiceModel.create({
      id: input.id.id || new Id().id,
      name: input.name,
      document: input.document,
      invoiceItems: input.invoiceItems.map((invoiceItem) => {
        return {
          id: invoiceItem.id.id || new Id().id,
          name: invoiceItem.name,
          price: invoiceItem.price,
        }
      }),
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }, {
      include: [{
        association: InvoiceModel.associations.invoiceItems,
      }],
      raw: true,
    }
    );

    const createdInvoice: InvoiceModel = createdData.dataValues;
    const invoiceItems: InvoiceItemModel[] = createdInvoice.invoiceItems;

    const invoice = new Invoice({
      id: new Id(createdInvoice.id),
      name: createdInvoice.name,
      document: createdInvoice.document,
      createdAt: createdInvoice.createdAt,
      updatedAt: createdInvoice.updatedAt,
      // TODO: Address DB implementation
      address: input.address,
      invoiceItems: invoiceItems.map((invoiceItem) => {
        const invoiceItemData = invoiceItem.dataValues;

        return new InvoiceItem({
          id: new Id(invoiceItemData.id),
          name: invoiceItemData.name,
          price: invoiceItemData.price,
        })
      }),
    })

    return invoice;
  }

  find(id: string): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }
}