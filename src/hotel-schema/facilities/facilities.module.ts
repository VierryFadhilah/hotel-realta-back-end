import { Module } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { FacilitiesController } from './facilities.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facilities } from 'models/hotelSchema';
import { FacilityPriceHistoryModule } from '../facility-price-history/facility-price-history.module';
import { CategoryGroupModule } from 'src/master-schema/category_group/category_group.module';

@Module({
  imports: [
    SequelizeModule.forFeature([facilities]),
    FacilityPriceHistoryModule,
    CategoryGroupModule,
  ],
  controllers: [FacilitiesController],
  providers: [FacilitiesService],
})
export class FacilitiesModule {}
