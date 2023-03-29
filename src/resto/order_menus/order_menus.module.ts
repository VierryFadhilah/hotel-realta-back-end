import { Module } from '@nestjs/common';
import { OrderMenusService } from './order_menus.service';
import { OrderMenusController } from './order_menus.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_menus } from 'models/restoSchema';

@Module({
  imports: [SequelizeModule.forFeature([order_menus])],
  controllers: [OrderMenusController],
  providers: [OrderMenusService],
})
export class OrderMenusModule {}
