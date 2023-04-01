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

export interface fintechAttributes {
  paga_entity_id: number;
  paga_code?: string;
  paga_name?: string;
  paga_modified?: Date;
}

@Table({ tableName: 'fintech', schema: 'payment', timestamps: false })
export class fintech
  extends Model<fintechAttributes, fintechAttributes>
  implements fintechAttributes
{
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'fintech_pkey', using: 'btree', unique: true })
  paga_entity_id!: number;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  @Index({ name: 'fintech_paga_code_key', using: 'btree', unique: true })
  paga_code?: string;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  @Index({ name: 'fintech_paga_name_key', using: 'btree', unique: true })
  paga_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  paga_modified?: Date;

  @HasMany(() => user_accounts, { sourceKey: 'paga_entity_id' })
  user_accounts?: user_accounts[];

  @HasOne(() => entity, { sourceKey: 'paga_entity_id' })
  entity?: entity;
}
