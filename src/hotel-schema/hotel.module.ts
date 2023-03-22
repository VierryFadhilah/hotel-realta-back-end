import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsModule } from './hotels/hotels.module';
import { HotelReviewsModule } from './hotel-reviews/hotel-reviews.module';
import { FacilityPriceHistoryModule } from './facility-price-history/facility-price-history.module';
import { FacilityPhotosModule } from './facility-photos/facility-photos.module';
import { FacilitiesModule } from './facilities/facilities.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    HotelsModule,
    HotelReviewsModule,
    FacilityPriceHistoryModule,
    FacilityPhotosModule,
    FacilitiesModule,
  ],
})
export class AppModule {}
