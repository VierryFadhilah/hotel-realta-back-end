import { PartialType } from '@nestjs/mapped-types';
import { CreateFacilityDto } from './create-facility.dto';
import { IsOptional } from 'class-validator';

export class UpdateFacilityDto extends PartialType(CreateFacilityDto) {
  faci_id?: number;
  faci_name?: string;
  faci_description?: string;
  faci_max_number?: number;
  faci_measure_unit?: string;
  faci_room_number?: string;
  faci_startdate?: string | any;
  faci_enddate?: string | any;
  faci_low_price?: string;
  faci_high_price?: string;
  faci_rate_price?: string;
  faci_discount?: string;
  faci_tax_rate?: string;
  faci_cagro_id?: number;
  faci_hotel_id?: number;
  faci_modified_date?: Date;
  faph_user_id: number;
}
