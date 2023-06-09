import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface facility_price_historyAttributes {
  faph_id?: number;
  faph_startdate?: Date;
  faph_enddate?: Date;
  faph_low_price?: string;
  faph_high_price?: string;
  faph_rate_price?: string;
  faph_discount?: string;
  faph_tax_rate?: string;
  faph_modified_date?: Date;
  faph_user_id?: number;
  faph_faci_id?: number;
  faph_expose_price?: string;
}

@Table({
  tableName: 'facility_price_history',
  schema: 'hotel',
  timestamps: false,
})
export class facility_price_history
  extends Model<
    facility_price_historyAttributes,
    facility_price_historyAttributes
  >
  implements facility_price_historyAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.facility_price_history_faph_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'facility_price_history_pkey', using: 'btree', unique: true })
  faph_id?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  faph_startdate?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  faph_enddate?: Date;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faph_low_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faph_high_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faph_rate_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faph_discount?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faph_tax_rate?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  faph_modified_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  faph_user_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  faph_faci_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  faph_expose_price?: string;
}
