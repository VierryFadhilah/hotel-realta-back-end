import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { users, user_members } from '../usersSchema';
import { hotels, facilities } from '../hotelSchema';

export interface membersAttributes {
  memb_name: string;
}

@Table({ tableName: 'members', schema: 'master', timestamps: false })
export class members
  extends Model<membersAttributes, membersAttributes>
  implements membersAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(15) })
  @Index({ name: 'members_pkey', using: 'btree', unique: true })
  memb_name!: string;

  @BelongsToMany(() => users, () => user_members)
  users?: users[];

  @BelongsToMany(() => hotels, () => facilities)
  hotels?: hotels[];
}
