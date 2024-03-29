import AgregateRoot from "../../@shared/domain/entity/agregateRoot.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/idValueObject";

type ProductProps = {
  id: Id;
  name: string;
  description: string;
  salesPrice: number;
}

export default class Products extends BaseEntity implements AgregateRoot {
  private _name: string;
  private _description: string;
  private _salesPrice: number;

  constructor(props: ProductProps) {
    super(props.id)
    this._name = props.name;
    this._description = props.description;
    this._salesPrice = props.salesPrice;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get salesPrice(): number {
    return this._salesPrice;
  }
}