import {
  Column,
  Model,
  PrimaryKey,
  Table,
  HasMany
} from "sequelize-typescript";
import InvoiceItemModel from "./invoiceItem.model";

@Table({
  tableName: 'invoice',
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  document: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @HasMany(() => InvoiceItemModel)
  invoiceItems: ReturnType<() => InvoiceItemModel[]>;

  @Column({ allowNull: true })
  addressId: string;
}