import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { stocks } from 'models/Purchasing/purchasingSchema';
import { facilities } from 'models/hotelSchema';

@Module({
  imports: [SequelizeModule.forFeature([stocks, facilities])],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
