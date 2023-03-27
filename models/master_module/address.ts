import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface addressAttributes {
  addr_id?: number;
  addr_line1?: string;
  addr_line2?: string;
  addr_postal_code?: string;
  addr_spatial_location?: any;
  addr_prov_id?: number;
}

@Table({ tableName: 'address', schema: 'master', timestamps: false })
export class address
  extends Model<addressAttributes, addressAttributes>
  implements addressAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('master.address_addr_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'address_pkey', using: 'btree', unique: true })
  addr_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  addr_line1?: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  addr_line2?: string;

  @Column({ allowNull: true, type: DataType.STRING(5) })
  addr_postal_code?: string;

  @Column({ allowNull: true, type: DataType.JSON })
  addr_spatial_location?: any;

  @Column({ allowNull: true, type: DataType.INTEGER })
  addr_prov_id?: number;
}
