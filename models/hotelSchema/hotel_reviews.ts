import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface hotel_reviewsAttributes {
  hore_id?: number;
  hore_user_review?: string;
  hore_rating?: number;
  hore_created_on?: Date;
  hore_user_id?: number;
  hore_hotel_id?: number;
}

@Table({ tableName: 'hotel_reviews', schema: 'hotel', timestamps: false })
export class hotel_reviews
  extends Model<hotel_reviewsAttributes, hotel_reviewsAttributes>
  implements hotel_reviewsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.hotel_reviews_hore_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'hotel_reviews_pkey', using: 'btree', unique: true })
  hore_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(125) })
  hore_user_review?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  hore_rating?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  hore_created_on?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  hore_user_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  hore_hotel_id?: number;
}
