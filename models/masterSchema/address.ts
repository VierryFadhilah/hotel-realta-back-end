import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface addressAttributes {
  addr_id?: number;
  addr_line1?: string;
}

@Table({ tableName: 'address', schema: 'master', timestamps: false })
export class address
  extends Model<addressAttributes, addressAttributes>
  implements addressAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  addr_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  addr_line1?: string;
}
