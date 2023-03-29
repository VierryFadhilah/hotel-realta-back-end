import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
} from 'sequelize-typescript';

export interface resto_menusAttributes {
  reme_faci_id?: number;
  reme_id?: number;
  reme_name?: string;
  reme_discription?: string;
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
  reme_discription?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  reme_price?: string;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  reme_status?: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  })
  reme_modified_date?: Date;
}
