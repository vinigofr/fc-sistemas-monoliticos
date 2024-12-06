import ValueObject from "./valueObject.interface";

interface AddressProps {
  street: string;
  city: string;
  zipCode: string;
  number: string;
  complement: string;
  state: string;
}

export default class Address implements ValueObject {
  private _street: string;
  private _city: string;
  private _zipCode: string;
  private _number: string;
  private _complement: string;
  private _state: string;

  constructor(props: AddressProps) {
    this._street = props.street;
    this._city = props.city;
    this._zipCode = props.zipCode;
    this._number = props.number;
    this._complement = props.complement;
    this._state = props.state;
  }

  get street(): string {
    return this._street;
  }

  get city(): string {
    return this._city;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get number(): string {
    return this._number;
  }

  get complement(): string {
    return this._complement;
  }

  get state(): string {
    return this._state;
  }
}