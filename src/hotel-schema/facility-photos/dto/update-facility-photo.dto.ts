import { PartialType } from '@nestjs/mapped-types';
import { CreateFacilityPhotoDto } from './create-facility-photo.dto';

export class UpdateFacilityPhotoDto extends PartialType(CreateFacilityPhotoDto) {}
