import { Module } from '@nestjs/common';
import { FacilityPhotosService } from './facility-photos.service';
import { FacilityPhotosController } from './facility-photos.controller';

@Module({
  controllers: [FacilityPhotosController],
  providers: [FacilityPhotosService]
})
export class FacilityPhotosModule {}
