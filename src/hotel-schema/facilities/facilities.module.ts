import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facilities } from 'models/hotel_module';
import { FacilityPriceHistoryModule } from '../facility-price-history/facility-price-history.module';

@Module({
  imports: [
    SequelizeModule.forFeature([facilities]),
    FacilityPriceHistoryModule,
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})
export class FacilitiesModule {}
