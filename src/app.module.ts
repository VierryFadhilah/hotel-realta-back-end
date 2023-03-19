import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsModule } from './hotel-schema/hotels/hotels.module';
import { HotelReviewsModule } from './hotel-schema/hotel-reviews/hotel-reviews.module';
import { FacilitiesModule } from './hotel-schema/facilities/facilities.module';
import { FacilityPriceHistoryModule } from './hotel-schema/facility-price-history/facility-price-history.module';
import { FacilityPhotosModule } from './hotel-schema/facility-photos/facility-photos.module';

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
    FacilitiesModule,
    FacilityPriceHistoryModule,
    FacilityPhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
