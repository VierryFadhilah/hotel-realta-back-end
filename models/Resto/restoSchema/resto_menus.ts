import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { resto_menu_photos } from './resto_menu_photos';
import { order_menu_detail } from './order_menu_detail';

export interface resto_menusAttributes {
  reme_faci_id?: number;
  reme_id?: number;
  reme_name?: string;
  reme_description?: string;
  reme_price?: string;
  reme_status?: string;
  reme_modified_date?: Date;
}

@Table({ tableName: 'resto_menus', schema: 'resto', timestamps: false })
export class resto_menus
  extends Model<resto_menusAttributes, resto_menusAttributes>
  implements resto_menusAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  reme_faci_id?: number;

  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('resto.resto_menus_reme_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_reme_id', using: 'btree', unique: true })
  reme_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  reme_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  reme_description?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  reme_price?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  reme_status?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
  })
  reme_modified_date?: Date;

  @HasMany(() => resto_menu_photos, { sourceKey: 'reme_id' })
  resto_menu_photos?: resto_menu_photos[];

  @HasMany(() => order_menu_detail, { sourceKey: 'reme_id' })
  order_menu_details?: order_menu_detail[];
}
