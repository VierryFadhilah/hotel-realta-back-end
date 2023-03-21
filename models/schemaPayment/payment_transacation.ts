import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface payment_transacationAttributes {
  part_id?: number;
  part_trx_number?: string;
  part_debet?: string;
  part_credit?: string;
  part_type?: string;
  part_note?: string;
  part_modified_date?: Date;
  part_order_number?: string;
  part_source_id?: number;
  part_target_id?: number;
  part_trx_number_ref?: string;
  pary_user_id?: number;
}

@Table({
  tableName: 'payment_transacation',
  schema: 'payment',
  timestamps: false,
})
export class payment_transacation
  extends Model<payment_transacationAttributes, payment_transacationAttributes>
  implements payment_transacationAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('payment.payment_transacation_part_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_part_id', using: 'btree', unique: true })
  part_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({
    name: 'payment_transacation_part_trx_number_key',
    using: 'btree',
    unique: true,
  })
  part_trx_number?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  part_debet?: string;

  @Column({ allowNull: true, type: DataType.DECIMAL })
  part_credit?: string;

  @Column({ allowNull: true, type: DataType.STRING(3) })
  part_type?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  part_note?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  part_modified_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  part_order_number?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  part_source_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  part_target_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({
    name: 'payment_transacation_part_trx_number_ref_key',
    using: 'btree',
    unique: true,
  })
  part_trx_number_ref?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  pary_user_id?: number;
}
