import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenuPhotosController } from './resto_menu_photos.controller';
import { RestoMenuPhotosService } from './resto_menu_photos.service';

describe('RestoMenuPhotosController', () => {
  let controller: RestoMenuPhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestoMenuPhotosController],
      providers: [RestoMenuPhotosService],
    }).compile();

    controller = module.get<RestoMenuPhotosController>(
      RestoMenuPhotosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
