import { Test, TestingModule } from '@nestjs/testing';
import { FacilityPhotosController } from './facility-photos.controller';
import { FacilityPhotosService } from './facility-photos.service';

describe('FacilityPhotosController', () => {
  let controller: FacilityPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacilityPhotosController],
      providers: [FacilityPhotosService],
    }).compile();

    controller = module.get<FacilityPhotosController>(FacilityPhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
