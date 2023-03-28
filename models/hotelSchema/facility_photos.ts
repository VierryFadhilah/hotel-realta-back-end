import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface facility_photosAttributes {
  fapho_id?: number;
  fapho_faci_id?: number;
  fapho_thumbnail_filename?: string;
  fapho_photo_filename?: string;
  fapho_primary?: boolean;
  fapho_modified_date?: Date;
}

@Table({ tableName: 'facility_photos', schema: 'hotel', timestamps: false })
export class facility_photos
  extends Model<facility_photosAttributes, facility_photosAttributes>
  implements facility_photosAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  @Index({ name: 'facility_photos_pkey', using: 'btree', unique: true })
  fapho_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  fapho_faci_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  fapho_thumbnail_filename?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  fapho_photo_filename?: string;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  fapho_primary?: boolean;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  fapho_modified_date?: Date;
}
