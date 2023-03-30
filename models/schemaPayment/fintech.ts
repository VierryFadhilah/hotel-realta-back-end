import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
  BelongsTo,
} from 'sequelize-typescript';
import { entity } from './entity';

export interface fintechAttributes {
  paga_entity_id: number;
  paga_code?: string;
  paga_name?: string;
  paga_modified?: Date;
}

@Table({ tableName: 'fintech', schema: 'payment', timestamps: true, createdAt:'paga_modified', updatedAt:'paga_modified'})
export class fintech
  extends Model<fintechAttributes, fintechAttributes>
  implements fintechAttributes
{
  @ForeignKey(() => entity)
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

  @BelongsTo(() => entity)
  entity?: entity;
}
