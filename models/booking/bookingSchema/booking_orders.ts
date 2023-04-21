import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsToMany,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { facilities, hotels } from '../hotelSchema';
import { booking_order_details } from './booking_order_details';
import { users } from '../usersSchema';

export interface booking_ordersAttributes {
  boor_id?: number;
  boor_order_number?: string;
  boor_order_date?: Date;
  boor_arival_date?: Date;
  boor_total_room?: number;
  boor_total_guest?: number;
  boor_discount?: string;
  boor_total_tax?: string;
  boor_total_amount?: string;
  boor_down_payment?: string;
  boor_pay_type?: string;
  boor_is_paid?: string;
  boor_type?: string;
  boor_cardnumber?: string;
  boor_member_type?: string;
  boor_status?: string;
  boor_user_id?: number;
  boor_hotel_id?: number;
}

@Table({ tableName: 'booking_orders', schema: 'booking', timestamps: false })
export class booking_orders
  extends Model<booking_ordersAttributes, booking_ordersAttributes>
  implements booking_ordersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('booking.booking_orders_boor_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_boor_id', using: 'btree', unique: true })
  boor_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  @Index({
    name: 'booking_orders_boor_order_number_key',
    using: 'btree',
    unique: true,
  })
  boor_order_number?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  boor_order_date?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  boor_arival_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  boor_total_room?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  boor_total_guest?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  boor_discount?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  boor_total_tax?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  boor_total_amount?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  boor_down_payment?: string;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  boor_pay_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  boor_is_paid?: string;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  boor_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  boor_cardnumber?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  boor_member_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  boor_status?: string;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  boor_user_id?: number;

  @ForeignKey(() => hotels)
  @Column({ allowNull: true, type: DataType.INTEGER })
  boor_hotel_id?: number;

  @BelongsToMany(() => facilities, () => booking_order_details)
  facilities?: facilities[];

  @HasMany(() => booking_order_details, { as: 'order_details' })
  order_details?: booking_order_details[];

  @BelongsTo(() => users)
  users?: users;

  @BelongsTo(() => hotels)
  hotels?: hotels;
}
