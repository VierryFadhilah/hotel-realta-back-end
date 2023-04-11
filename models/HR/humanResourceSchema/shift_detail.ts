import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { employee } from './employee';

export interface shift_detailAttributes {
  shide_id?: number;
  shide_shift_id?: number;
  shide_emp_id?: number;
}

@Table({
  tableName: 'shift_detail',
  schema: 'human_resource',
  timestamps: false,
})
export class shift_detail
  extends Model<shift_detailAttributes, shift_detailAttributes>
  implements shift_detailAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resource.shift_detail_shide_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_shide_id', using: 'btree', unique: true })
  shide_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  shide_shift_id?: number;

  @ForeignKey(() => employee)
  @Column({ allowNull: true, type: DataType.INTEGER })
  shide_emp_id?: number;

  @BelongsTo(() => employee)
  employee?: employee;
}
