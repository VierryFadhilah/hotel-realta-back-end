import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { booking_order_details } from './booking_order_details';
import { special_offer_coupons } from './special_offer_coupons';

export interface special_offersAttributes {
  spof_id?: number;
  spof_name?: string;
  spof_description?: string;
  spof_type?: string;
  spof_discount?: string;
  spof_start_date?: Date;
  spof_end_date?: Date;
  spof_min_qty?: number;
  spof_max_qty?: number;
  spof_modified_date?: Date;
}

@Table({ tableName: 'special_offers', schema: 'booking', timestamps: false })
export class special_offers
  extends Model<special_offersAttributes, special_offersAttributes>
  implements special_offersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('booking.special_offers_spof_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_spof_id', using: 'btree', unique: true })
  spof_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  spof_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  spof_description?: string;

  @Column({ allowNull: true, type: DataType.STRING(1) })
  spof_type?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  spof_discount?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  spof_start_date?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  spof_end_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  spof_min_qty?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  spof_max_qty?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  spof_modified_date?: Date;

  @BelongsToMany(() => booking_order_details, () => special_offer_coupons)
  booking_order_details?: booking_order_details[];
}
