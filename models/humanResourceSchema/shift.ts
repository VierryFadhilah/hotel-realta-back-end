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
import { employee_department_history } from './employee_department_history';

export interface shiftAttributes {
  shift_id: number;
  shift_name?: string;
  shift_start_time?: Date;
  shift_end_time?: Date;
}

@Table({ tableName: 'shift', schema: 'human_resource', timestamps: false })
export class shift
  extends Model<shiftAttributes, shiftAttributes>
  implements shiftAttributes
{
  @ForeignKey(() => employee_department_history)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_shift_id', using: 'btree', unique: true })
  shift_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({ name: 'shift_shift_name_key', using: 'btree', unique: true })
  shift_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  @Index({ name: 'shift_shift_start_time_key', using: 'btree', unique: true })
  shift_start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  @Index({ name: 'shift_shift_end_time_key', using: 'btree', unique: true })
  shift_end_time?: Date;

  @BelongsTo(() => employee_department_history)
  employee_department_history?: employee_department_history;
}
