import { Module } from '@nestjs/common';
import { RestoMenuPhotosService } from './resto_menu_photos.service';
import { RestoMenuPhotosController } from './resto_menu_photos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { resto_menu_photos } from 'models/Resto/restoSchema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([resto_menu_photos]),
    MulterModule.register({
      dest: './uploads/image/resto',
    }),
  ],
  controllers: [RestoMenuPhotosController],
  providers: [RestoMenuPhotosService],
})
export class RestoMenuPhotosModule {}
