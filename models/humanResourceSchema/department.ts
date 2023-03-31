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

export interface departmentAttributes {
  dept_id?: number;
  dept_name?: string;
  dept_modified_date?: Date;
}

@Table({ tableName: 'department', schema: 'human_resource', timestamps: false })
export class department
  extends Model<departmentAttributes, departmentAttributes>
  implements departmentAttributes
{
  @ForeignKey(() => employee_department_history)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resource.department_dept_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_dept_id', using: 'btree', unique: true })
  dept_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  dept_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  dept_modified_date?: Date;

  @BelongsTo(() => employee_department_history)
  employee_department_history?: employee_department_history;
}
