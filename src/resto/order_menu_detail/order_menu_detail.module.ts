import { Module } from '@nestjs/common';
import { OrderMenuDetailService } from './order_menu_detail.service';
import { OrderMenuDetailController } from './order_menu_detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_menu_detail } from 'models/restoSchema';

@Module({
  imports: [SequelizeModule.forFeature([order_menu_detail])],
  controllers: [OrderMenuDetailController],
  providers: [OrderMenuDetailService],
})
export class OrderMenuDetailModule {}
