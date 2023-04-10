import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { work_orders } from '../humanResourceSchema/work_orders';
import { employee } from '../humanResourceSchema/employee';
// import { user_accounts } from '../schemaPayment/user_accounts';

export interface usersAttributes {
  user_id?: number;
  user_full_name?: string;
  user_company_name?: string;
  user_email?: string;
  user_phone_number?: string;
  user_modified_date?: Date;
  user_type?: string;
  user_photo_profile?: string;
  user_hotel_id?: number;
}

@Table({ tableName: 'users', schema: 'users', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.users_user_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_user_id', using: 'btree', unique: true })
  user_id?: number;

  @Column({
    allowNull: true,
    type: DataType.STRING,
    defaultValue: Sequelize.literal(
      "('guest'::text || nextval('sequence_for_user_full_name'::regclass))",
    ),
  })
  user_full_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  user_company_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(256) })
  user_email?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({ name: 'users_user_phone_number_key', using: 'btree', unique: true })
  user_phone_number?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  user_modified_date?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(15),
    defaultValue: Sequelize.literal("'T'::character varying"),
  })
  user_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  user_photo_profile?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_hotel_id?: number;

  @HasMany(() => work_orders, { sourceKey: 'user_id' })
  work_orders?: work_orders[];

  @HasOne(() => employee, { sourceKey: 'user_id' })
  employee?: employee;

  // @HasMany(() => user_accounts, { sourceKey: 'user_id' })
  // user_accounts?: user_accounts[];
}
