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
import { special_offers } from './special_offers';
import { special_offer_coupons } from './special_offer_coupons';
import { user_breakfast } from './user_breakfast';
import { price_items } from '../masterSchema';
import { booking_order_detail_extra } from './booking_order_detail_extra';
import { booking_orders } from './booking_orders';
import { facilities } from '../hotelSchema';

export interface booking_order_detailsAttributes {
  border_boor_id: number;
  borde_id?: number;
  borde_checkin?: Date;
  borde_checkout?: Date;
  borde_adults?: number;
  borde_kids?: number;
  borde_price?: string;
  borde_extra?: string;
  borde_discount?: string;
  borde_tax?: string;
  borde_subtotal?: string;
  borde_faci_id?: number;
}

@Table({
  tableName: 'booking_order_details',
  schema: 'booking',
  timestamps: false,
})
export class booking_order_details
  extends Model<
    booking_order_detailsAttributes,
    booking_order_detailsAttributes
  >
  implements booking_order_detailsAttributes
{
  @ForeignKey(() => booking_orders)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_border_boor_id', using: 'btree', unique: true })
  border_boor_id!: number;

  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('booking.booking_order_details_borde_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_border_boor_id', using: 'btree', unique: true })
  @Index({ name: 'uk_borde_id', using: 'btree', unique: true })
  borde_id?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  borde_checkin?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  borde_checkout?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  borde_adults?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  borde_kids?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_extra?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_discount?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_tax?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  borde_subtotal?: string;

  @ForeignKey(() => facilities)
  @Column({ allowNull: true, type: DataType.INTEGER })
  borde_faci_id?: number;

  @BelongsToMany(() => special_offers, () => special_offer_coupons)
  special_offers?: special_offers[];

  @HasMany(() => user_breakfast, { sourceKey: 'borde_id' })
  user_breakfasts?: user_breakfast[];

  @BelongsToMany(() => price_items, () => booking_order_detail_extra)
  price_items?: price_items[];

  @BelongsTo(() => facilities)
  facility?: facilities;

  @BelongsTo(() => booking_orders)
  booking_orders?: booking_orders;

  @HasMany(() => special_offer_coupons, { foreignKey: 'soco_borde_id' })
  special_offer_coupons_borde?: special_offer_coupons[];

  @HasMany(() => booking_order_detail_extra)
  boex?: booking_order_detail_extra[];
}
