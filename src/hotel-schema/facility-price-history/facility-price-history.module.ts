import { Module } from '@nestjs/common';
import { FacilityPriceHistoryService } from './facility-price-history.service';
import { FacilityPriceHistoryController } from './facility-price-history.controller';

@Module({
  controllers: [FacilityPriceHistoryController],
  providers: [FacilityPriceHistoryService]
})
export class FacilityPriceHistoryModule {}
