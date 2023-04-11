import { Module } from '@nestjs/common';
import { StockDetailService } from './stock_detail.service';
import { StockDetailController } from './stock_detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { stock_detail } from 'models/Purchasing/purchasingSchema';

@Module({
  imports: [SequelizeModule.forFeature([stock_detail])],
  controllers: [StockDetailController],
  providers: [StockDetailService],
})
export class StockDetailModule {}
