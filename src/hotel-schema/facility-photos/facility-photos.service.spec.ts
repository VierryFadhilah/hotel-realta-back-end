import { Test, TestingModule } from '@nestjs/testing';
import { FacilityPhotosService } from './facility-photos.service';

describe('FacilityPhotosService', () => {
  let service: FacilityPhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacilityPhotosService],
    }).compile();

    service = module.get<FacilityPhotosService>(FacilityPhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
