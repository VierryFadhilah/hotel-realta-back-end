import { Module } from '@nestjs/common';
import { OrderMenusService } from './order_menus.service';
import { OrderMenusController } from './order_menus.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_menu_detail, order_menus } from 'models/restoSchema';
import { OrderMenuDetailService } from '../order_menu_detail/order_menu_detail.service';

@Module({
  imports: [SequelizeModule.forFeature([order_menus, order_menu_detail])],
  controllers: [OrderMenusController],
  providers: [OrderMenusService, OrderMenuDetailService],
  exports: [OrderMenusService],
})
export class OrderMenusModule {}
