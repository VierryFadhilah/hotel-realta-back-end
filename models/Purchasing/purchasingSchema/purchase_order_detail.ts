import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { stocks } from './stocks';
import { purchase_order_header } from './purchase_order_header';

export interface purchase_order_detailAttributes {
  pode_pohe_id: number;
  pode_id?: number;
  pode_order_qty?: number;
  pode_price?: number;
  pode_line_total?: number;
  pode_received_qty?: number;
  pode_rejected_qty?: number;
  pode_stocked_qty?: number;
  pode_modified_date?: Date;
  pode_stock_id?: number;
}

@Table({
  tableName: 'purchase_order_detail',
  schema: 'purchasing',
  timestamps: false,
})
export class purchase_order_detail
  extends Model<
    purchase_order_detailAttributes,
    purchase_order_detailAttributes
  >
  implements purchase_order_detailAttributes
{
  @ForeignKey(() => purchase_order_header)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_pode_pohe_id', using: 'btree', unique: true })
  pode_pohe_id!: number;

  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('purchasing.purchase_order_detail_pode_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_pode_pohe_id', using: 'btree', unique: true })
  pode_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  pode_order_qty?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  pode_price?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  pode_line_total?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL(8, 2) })
  pode_received_qty?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL(8, 2) })
  pode_rejected_qty?: number;

  @Column({ allowNull: true, type: DataType.DECIMAL(9, 2) })
  pode_stocked_qty?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  pode_modified_date?: Date;

  @ForeignKey(() => stocks)
  @Column({ allowNull: true, type: DataType.INTEGER })
  pode_stock_id?: number;

  @BelongsTo(() => stocks)
  stock?: stocks;

  @BelongsTo(() => purchase_order_header)
  purchase_order_header?: purchase_order_header;
}
