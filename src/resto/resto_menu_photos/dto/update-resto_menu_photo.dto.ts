import { PartialType } from '@nestjs/mapped-types';
import { CreateRestoMenuPhotoDto } from './create-resto_menu_photo.dto';

export class UpdateRestoMenuPhotoDto extends PartialType(
  CreateRestoMenuPhotoDto,
) {
  remp_thumbnail_filename?: string;
  remp_photo_filename?: string;
  remp_primary?: string;
  remp_url: string;
  remp_reme_id?: number;
}
