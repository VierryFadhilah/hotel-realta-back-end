import { Module } from '@nestjs/common';
import { HotelReviewsService } from './hotel-reviews.service';
import { HotelReviewsController } from './hotel-reviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { hotel_reviews } from 'models/hotelSchema';

@Module({
  imports: [SequelizeModule.forFeature([hotel_reviews])],
  controllers: [HotelReviewsController],
  providers: [HotelReviewsService],
})
export class HotelReviewsModule {}
