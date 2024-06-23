import AgregateRoot from "../../@shared/domain/entity/agregateRoot.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/addressValueObject";
import Id from "../../@shared/domain/value-object/idValueObject";
import InvoiceItem from "./invoiceItem.entity";

interface InvoiceProps {
  id?: Id;
  name: string;
  document: string;
  address: Address | null;
  invoiceItems: InvoiceItem[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AgregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _invoiceItems: InvoiceItem[];

  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._invoiceItems = props.invoiceItems;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get invoiceItems(): InvoiceItem[] {
    return this._invoiceItems;
  }

  get total(): number {
    return this._invoiceItems.reduce((acc, item) => acc + item.price, 0);
  }
}