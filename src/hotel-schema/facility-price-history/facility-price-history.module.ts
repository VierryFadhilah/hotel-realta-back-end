import { Module } from '@nestjs/common';
import { FacilityPriceHistoryService } from './facility-price-history.service';
import { FacilityPriceHistoryController } from './facility-price-history.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facility_price_history } from 'models/hotel_module';

@Module({
  imports: [SequelizeModule.forFeature([facility_price_history])],
  controllers: [FacilityPriceHistoryController],
  providers: [FacilityPriceHistoryService],
  exports: [FacilityPriceHistoryService],
})
export class FacilityPriceHistoryModule {}
