import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { work_order_detail } from './work_order_detail';
import { users } from '../usersSchema/users';

export interface employeeAttributes {
  emp_id?: number;
  emp_national_id?: string;
  emp_birth_date?: Date;
  emp_marital_status?: string;
  emp_gender?: string;
  emp_hire_date?: Date;
  emp_salaried_flag?: string;
  emp_vacation_hours?: number;
  emp_sickleave_hours?: number;
  emp_current_flag?: number;
  emp_photo?: string;
  emp_modified_date?: Date;
  emp_emp_id?: number;
  emp_joro_id?: number;
  emp_user_id?: number;
}

@Table({ tableName: 'employee', schema: 'human_resource', timestamps: false })
export class employee
  extends Model<employeeAttributes, employeeAttributes>
  implements employeeAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resource.employee_emp_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_emp_id', using: 'btree', unique: true })
  emp_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({ name: 'employee_emp_national_id_key', using: 'btree', unique: true })
  emp_national_id?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  emp_birth_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  emp_marital_status?: string;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  emp_gender?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  emp_hire_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  emp_salaried_flag?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_vacation_hours?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_sickleave_hours?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_current_flag?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  emp_photo?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  emp_modified_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_emp_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_joro_id?: number;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  emp_user_id?: number;

  @HasMany(() => work_order_detail, { sourceKey: 'emp_id' })
  work_order_details?: work_order_detail[];

  @BelongsTo(() => users)
  user?: users;
}