import { Module } from '@nestjs/common';
import { HotelReviewsService } from './hotel-reviews.service';
import { HotelReviewsController } from './hotel-reviews.controller';

@Module({
  controllers: [HotelReviewsController],
  providers: [HotelReviewsService]
})
export class HotelReviewsModule {}
