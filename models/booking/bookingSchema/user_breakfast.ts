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
import { booking_order_details } from './booking_order_details';

export interface user_breakfastAttributes {
  usbr_borde_id: number;
  usbr_modified_date: Date;
  usbr_total_vacant?: number;
}

@Table({ tableName: 'user_breakfast', schema: 'booking', timestamps: false })
export class user_breakfast
  extends Model<user_breakfastAttributes, user_breakfastAttributes>
  implements user_breakfastAttributes
{
  @ForeignKey(() => booking_order_details)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'user_breakfast_pkey', using: 'btree', unique: true })
  usbr_borde_id!: number;

  @Column({ primaryKey: true, type: DataType.DATE(6) })
  @Index({ name: 'user_breakfast_pkey', using: 'btree', unique: true })
  usbr_modified_date!: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  usbr_total_vacant?: number;

  @BelongsTo(() => booking_order_details)
  booking_order_detail?: booking_order_details;
}
