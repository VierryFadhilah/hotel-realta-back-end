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

export interface employee_pay_historyAttributes {
  ephi_emp_id: number;
  ephi_rate_change_date: Date;
  ephi_rate_salary?: string;
  ephi_pay_frequence?: number;
  ephi_modified_date?: Date;
}

@Table({
  tableName: 'employee_pay_history',
  schema: 'human_resource',
  timestamps: false,
})
export class employee_pay_history
  extends Model<employee_pay_historyAttributes, employee_pay_historyAttributes>
  implements employee_pay_historyAttributes
{
  @ForeignKey(() => employee)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_ephi', using: 'btree', unique: false })
  ephi_emp_id!: number;

  @Column({ primaryKey: true, type: DataType.DATE(6) })
  @Index({ name: 'pk_ephi', using: 'btree', unique: true })
  ephi_rate_change_date!: Date;

  @Column({ allowNull: true, type: DataType.NUMBER })
  ephi_rate_salary?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  ephi_pay_frequence?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  ephi_modified_date?: Date;

  @BelongsTo(() => employee)
  employee?: employee;
}
