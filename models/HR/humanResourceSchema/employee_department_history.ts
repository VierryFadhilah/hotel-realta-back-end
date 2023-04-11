import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { employee } from './employee';
import { department } from './department';
import { shift } from './shift';

export interface employee_department_historyAttributes {
  edhi_id?: number;
  edhi_emp_id: number;
  edhi_start_date?: Date;
  edhi_end_date?: Date;
  edhi_modified_date?: Date;
  edhi_dept_id?: number;
  edhi_shift_id?: number;
}

@Table({
  tableName: 'employee_department_history',
  schema: 'human_resource',
  timestamps: false,
})
export class employee_department_history
  extends Model<
    employee_department_historyAttributes,
    employee_department_historyAttributes
  >
  implements employee_department_historyAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resource.employee_department_history_edhi_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_edhi', using: 'btree', unique: true })
  edhi_id?: number;

  @ForeignKey(() => employee)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_edhi', using: 'btree', unique: true })
  edhi_emp_id!: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  edhi_start_date?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  edhi_end_date?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  edhi_modified_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  edhi_dept_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  edhi_shift_id?: number;

  @BelongsTo(() => employee)
  employee?: employee;

  @HasOne(() => department, { sourceKey: 'edhi_dept_id' })
  department?: department;

  @HasOne(() => shift, { sourceKey: 'edhi_shift_id' })
  shift?: shift;
}
