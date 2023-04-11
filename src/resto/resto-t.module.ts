import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  order_menu_detail,
  order_menus,
  resto_menu_photos,
  resto_menus,
} from 'models/Resto/restoSchema';
import { RestoMenusModule } from './resto_menus/resto_menus.module';
import { RestoMenuPhotosModule } from './resto_menu_photos/resto_menu_photos.module';
import { OrderMenusModule } from './order_menus/order_menus.module';
import { OrderMenuDetailModule } from './order_menu_detail/order_menu_detail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      resto_menus,
      resto_menu_photos,
      order_menus,
      order_menu_detail,
    ]),
    RestoMenusModule,
    RestoMenuPhotosModule,
    OrderMenusModule,
    OrderMenuDetailModule,
  ],
})
export class RestoTModule {}
