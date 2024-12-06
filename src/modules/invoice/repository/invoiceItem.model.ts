import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: 'invoiceItems',
  timestamps: false,
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  invoiceId: string;

  // I had some problem with using InvoiceModel directly.
  // GitHub issue: https://github.com/sequelize/sequelize-typescript/issues/825#issuecomment-1176225028
  @BelongsTo(() => InvoiceModel)
  invoice: ReturnType<() => InvoiceModel>;
}