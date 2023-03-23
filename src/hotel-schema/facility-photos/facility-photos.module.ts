import { Module } from '@nestjs/common';
import { FacilityPhotosService } from './facility-photos.service';
import { FacilityPhotosController } from './facility-photos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { facility_photos } from 'models/hotel_module/facility_photos';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    SequelizeModule.forFeature([facility_photos]),
    MulterModule.register({
      dest: 'uploads',
    }),
  ],
  controllers: [FacilityPhotosController],
  providers: [FacilityPhotosService],
})
export class FacilityPhotosModule {}
