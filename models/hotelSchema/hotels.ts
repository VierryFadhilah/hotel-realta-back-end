import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface hotelsAttributes {
  hotel_id?: number;
  hotel_name?: string;
  hotel_description?: string;
  hotel_rating_star?: string;
  hotel_phonenumber?: string;
  status?: string;
  reason?: string;
  hotel_addr_id?: number;
  hotel_modified_date?: Date;
}

@Table({ tableName: 'hotels', schema: 'hotel', timestamps: false })
export class hotels
  extends Model<hotelsAttributes, hotelsAttributes>
  implements hotelsAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.hotels_hotel_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'hotels_pkey', using: 'btree', unique: true })
  @Index({ name: 'pk_hotel_id', using: 'btree', unique: true })
  hotel_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(85) })
  hotel_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  hotel_description?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  hotel_rating_star?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  hotel_phonenumber?: string;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  status?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  reason?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  hotel_addr_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  hotel_modified_date?: Date;
}
