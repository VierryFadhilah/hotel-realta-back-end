import { users } from 'models/usersSchema';
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

export interface payment_transactionAttributes {
  part_id?: number;
  part_trx_number?: string;
  part_debet?: string;
  part_credit?: string;
  part_type?: string;
  part_note?: string;
  part_modified_date?: Date;
  part_order_number?: string;
  part_source_id?: string;
  part_target_id?: string;
  part_trx_number_ref?: string;
  part_user_id?: number;
}

@Table({
  tableName: 'payment_transaction',
  schema: 'payment',
  timestamps: true,
  createdAt: 'part_modified_date',
  updatedAt: 'part_modified_date',
})
export class payment_transaction
  extends Model<payment_transactionAttributes, payment_transactionAttributes>
  implements payment_transactionAttributes
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

  @Column({ allowNull: true, type: DataType.STRING(25) })
  part_source_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  part_target_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({
    name: 'payment_transacation_part_trx_number_ref_key',
    using: 'btree',
    unique: true,
  })
  part_trx_number_ref?: string;

  @ForeignKey(() => users)
  @Column({ allowNull: true, type: DataType.INTEGER })
  part_user_id?: number;

  @BelongsTo(() => users)
  user?: users;
}
