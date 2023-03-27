import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsModule } from './hotels/hotels.module';
import { HotelReviewsModule } from './hotel-reviews/hotel-reviews.module';
import { FacilityPriceHistoryModule } from './facility-price-history/facility-price-history.module';
import { FacilityPhotosModule } from './facility-photos/facility-photos.module';
import { FacilitiesModule } from './facilities/facilities.module';

@Module({
  imports: [
    HotelsModule,
    HotelReviewsModule,
    FacilityPriceHistoryModule,
    FacilityPhotosModule,
    FacilitiesModule,
  ],
})
export class HotelModule {}
