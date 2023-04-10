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
import { bank } from './bank';
import { fintech } from './fintech';

export interface entityAttributes {
  entity_id?: number;
}

@Table({ tableName: 'entity', schema: 'payment', timestamps: false })
export class entity
  extends Model<entityAttributes, entityAttributes>
  implements entityAttributes
{
  @ForeignKey(() => fintech)
  @ForeignKey(() => bank)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('payment.entity_entity_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'entity_pkey', using: 'btree', unique: true })
  entity_id?: number;

  @BelongsTo(() => bank)
  bank?: bank;

  @BelongsTo(() => fintech)
  fintech?: fintech;
}
