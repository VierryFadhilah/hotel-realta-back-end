import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface order_menu_detailAttributes {
  omde_id?: number;
  orme_price?: string;
  orme_qty?: number;
  orme_subtotal?: string;
  orme_discount?: string;
  omde_orme_id?: number;
  omde_reme_id?: number;
}

@Table({ tableName: 'order_menu_detail', schema: 'resto', timestamps: false })
export class order_menu_detail
  extends Model<order_menu_detailAttributes, order_menu_detailAttributes>
  implements order_menu_detailAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('resto.order_menu_detail_omde_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_omde_id', using: 'btree', unique: true })
  omde_id?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  orme_price?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  orme_qty?: number;

  @Column({ allowNull: true, type: DataType.NUMBER })
  orme_subtotal?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  orme_discount?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  omde_orme_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  omde_reme_id?: number;
}
