import AgregateRoot from "../../@shared/domain/entity/agregateRoot.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/idValueObject";

interface InvoiceProps {
  id?: Id;
  name: string;
  document: string;
  address: Object;
  invoiceItems: Object[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AgregateRoot {
  private _name: string;
  private _document: string;
  private _address: Object;
  private _invoiceItems: Object[];

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

  get address(): Object {
    return this._address;
  }

  get invoiceItems(): Object[] {
    return this._invoiceItems;
  }
}