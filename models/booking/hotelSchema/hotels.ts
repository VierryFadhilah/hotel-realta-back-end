import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { address, category_group, members } from '../masterSchema';
import { facilities_support } from './facilities_support';
import { facility_support_hotels } from './facility_support_hotels';
import { facilities } from './facilities';
import { users } from '../usersSchema';
import { hotel_reviews } from './hotel_reviews';
import { booking_orders } from '../bookingSchema';

export interface hotelsAttributes {
  hotel_id?: number;
  hotel_name?: string;
  hotel_description?: string;
  hotel_rating_star?: number;
  hotel_phonenumber?: string;
  hotel_modified_date?: string;
  hotel_addr_id?: number;
}

@Table({ tableName: 'hotels', schema: 'hotel', timestamps: false })
export class hotels
  extends Model<hotelsAttributes, hotelsAttributes>
  implements hotelsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.hotels_hotel_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_hotel_id', using: 'btree', unique: true })
  @Index({ name: 'hotels_pkey', using: 'btree', unique: true })
  hotel_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(85) })
  hotel_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  hotel_description?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  hotel_rating_star?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  hotel_phonenumber?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  hotel_modified_date?: string;

  @ForeignKey(() => address)
  @Column({ allowNull: true, type: DataType.INTEGER })
  hotel_addr_id?: number;

  @BelongsTo(() => address)
  address?: address;

  @BelongsToMany(() => facilities_support, () => facility_support_hotels)
  facilities_support?: facilities_support[];

  @BelongsToMany(() => category_group, () => facilities)
  category_groups?: category_group[];

  @BelongsToMany(() => members, () => facilities)
  members?: members[];

  @BelongsToMany(() => users, () => hotel_reviews)
  users_hotel_reviews?: users[];

  @HasMany(() => hotel_reviews, { as: 'hotel_user_reviews' })
  hotel_reviews?: hotel_reviews[];

  @BelongsToMany(() => users, () => booking_orders)
  users_booking_orders?: users[];

  @HasMany(() => booking_orders, { as: 'booking_orders2' })
  booking_orders?: booking_orders[];
  facility_photos: any;
}
