import AgregateRoot from "../../@shared/domain/entity/agregateRoot.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/idValueObject";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  zipCode: string;
  state: string;
}

export default class Client extends BaseEntity implements AgregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;
  private _document: string;
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _zipCode: string;
  private _state: string;

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
    this._document = props.document;
    this._street = props.street;
    this._number = props.number;
    this._complement = props.number;
    this._city = props.city;
    this._zipCode = props.city;
    this._state = props.city;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get address() {
    return this._address;
  }

  get document() {
    return this._document;
  };

  get street() {
    return this._street;
  };

  get number() {
    return this._number;
  };

  get complement() {
    return this._complement;
  };

  get city() {
    return this._city;
  };

  get zipCode() {
    return this._zipCode;
  };

  get state() {
    return this._state;
  }
}