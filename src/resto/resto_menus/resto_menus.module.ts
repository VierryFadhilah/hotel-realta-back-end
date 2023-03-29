import { Module } from '@nestjs/common';
import { RestoMenusService } from './resto_menus.service';
import { RestoMenusController } from './resto_menus.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { resto_menus } from 'models/restoSchema';

@Module({
  imports: [SequelizeModule.forFeature([resto_menus])],
  controllers: [RestoMenusController],
  providers: [RestoMenusService],
})
export class RestoMenusModule {}
