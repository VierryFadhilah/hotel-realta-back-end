import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface usersAttributes {
  user_id?: number;
  user_full_name?: string;
  user_type?: string;
  user_company_name?: string;
  user_email?: string;
  user_phone_number?: string;
  user_photo_profile?: string;
  user_modified_date?: Date;
  user_hotel_id?: number;
}

@Table({ tableName: 'users', schema: 'users', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('users.users_user_id_seq'::regclass)",
    ),
  })
  user_id?: number;

  @Column({ allowNull: true, type: DataType.STRING })
  user_full_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  user_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  user_company_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(256) })
  user_email?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  user_phone_number?: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  user_photo_profile?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  user_modified_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_hotel_id?: number;
  length: number;
  image: any;
  static photoProfile: any;
}
