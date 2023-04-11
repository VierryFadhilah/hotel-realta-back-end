import { Module } from '@nestjs/common';
import { StockPhotoService } from './stock_photo.service';
import { StockPhotoController } from './stock_photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { stock_photo } from 'models/Purchasing/purchasingSchema';

@Module({
  imports: [SequelizeModule.forFeature([stock_photo])],
  controllers: [StockPhotoController],
  providers: [StockPhotoService],
})
export class StockPhotoModule {}
