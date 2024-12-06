import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: 'address',
  timestamps: false,
})
export default class AddressModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  zipCode: string;

  @Column({ allowNull: false })
  number: string;

  @Column({ allowNull: false })
  complement: string;

  @Column({ allowNull: false })
  state: string;

}