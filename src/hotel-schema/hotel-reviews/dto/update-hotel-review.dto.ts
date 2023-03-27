import { PartialType } from '@nestjs/mapped-types';
import { CreateHotelReviewDto } from './create-hotel-review.dto';

export class UpdateHotelReviewDto extends PartialType(CreateHotelReviewDto) {}
