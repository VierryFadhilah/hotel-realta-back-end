import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { user_accounts } from './user_accounts';
import { entity } from './entity';

export interface bankAttributes {
  bank_entity_id: number;
  bank_code?: string;
  bank_name?: string;
  bank_modified_date?: Date;
}

@Table({
  tableName: 'bank',
  schema: 'payment',
  timestamps: true,
  createdAt: 'bank_modified_date',
  updatedAt: 'bank_modified_date',
})
export class bank
  extends Model<bankAttributes, bankAttributes>
  implements bankAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'bank_pkey', using: 'btree', unique: true })
  bank_entity_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  @Index({ name: 'bank_bank_code_key', using: 'btree', unique: true })
  bank_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({ name: 'bank_bank_name_key', using: 'btree', unique: true })
  bank_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  bank_modified_date?: Date;

  @HasMany(() => user_accounts, { sourceKey: 'bank_entity_id' })
  user_accounts?: user_accounts[];

  @HasOne(() => entity, { sourceKey: 'bank_entity_id' })
  entity?: entity;
}
