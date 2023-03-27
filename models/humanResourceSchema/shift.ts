import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface shiftAttributes {
  shift_id?: number;
  shift_name?: string;
  shift_start_time?: Date;
  shift_end_time?: Date;
}

@Table({ tableName: 'shift', schema: 'human_resource', timestamps: false })
export class shift
  extends Model<shiftAttributes, shiftAttributes>
  implements shiftAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('human_resource.shift_shift_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_shift_id', using: 'btree', unique: true })
  shift_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  @Index({ name: 'shift_shift_name_key', using: 'btree', unique: true })
  shift_name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  @Index({ name: 'shift_shift_start_time_key', using: 'btree', unique: true })
  shift_start_time?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  @Index({ name: 'shift_shift_end_time_key', using: 'btree', unique: true })
  shift_end_time?: Date;
}
