import Id from "../../@shared/domain/value-object/idValueObject";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItem from "../domain/invoiceItem.entity";
import InvoiceItemModel from "./invoiceItem.model";
import Invoice from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";
import Address from "../../@shared/domain/value-object/addressValueObject";
import AddressModel from "../../@shared/models/address.model";

export default class InvoiceRepository implements InvoiceGateway {
  async generate(input: Invoice): Promise<Invoice> {
    const createdAddressData = await AddressModel.create({
      id: new Id().id,
      street: input.address.street,
      city: input.address.city,
      zipCode: input.address.zipCode,
      number: input.address.number,
      complement: input.address.complement,
      state: input.address.state,
    }, { raw: true });

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
      addressId: createdAddressData.dataValues.id,
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
      address: new Address({
        street: createdAddressData.dataValues.street,
        city: createdAddressData.dataValues.city,
        zipCode: createdAddressData.dataValues.zipCode,
        number: createdAddressData.dataValues.number,
        complement: createdAddressData.dataValues.complement,
        state: createdAddressData.dataValues.state,
      }),
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

  async find(id: string): Promise<Invoice> {
    const result = await InvoiceModel.findOne({
      where: { id: id },
      include: [{ association: InvoiceModel.associations.invoiceItems, }],
    });

    if (!result) {
      throw new Error(`invoice.with.id.${id}.not.found`);
    }

    const addressResult = await AddressModel.findOne({ where: { id: result.dataValues.addressId } });

    const foundInvoice: InvoiceModel = result.dataValues;
    const invoiceItems: InvoiceItemModel[] = foundInvoice.invoiceItems;

    return new Invoice({
      id: new Id(foundInvoice.id),
      name: foundInvoice.name,
      document: foundInvoice.document,
      createdAt: foundInvoice.createdAt,
      updatedAt: foundInvoice.updatedAt,
      address: addressResult ? new Address({
        city: addressResult.dataValues.city,
        complement: addressResult.dataValues.complement,
        number: addressResult.dataValues.number,
        state: addressResult.dataValues.state,
        street: addressResult.dataValues.street,
        zipCode: addressResult.dataValues.zipCode
      }) : null,
      invoiceItems: invoiceItems.map((invoiceItem) => {
        const invoiceItemData = invoiceItem.dataValues;
        return new InvoiceItem({
          id: new Id(invoiceItemData.id),
          name: invoiceItemData.name,
          price: invoiceItemData.price,
        })
      }),
    });
  }
}