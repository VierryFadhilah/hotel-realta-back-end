import { Test, TestingModule } from '@nestjs/testing';
import { StockPhotoController } from './stock_photo.controller';
import { StockPhotoService } from './stock_photo.service';

describe('StockPhotoController', () => {
  let controller: StockPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockPhotoController],
      providers: [StockPhotoService],
    }).compile();

    controller = module.get<StockPhotoController>(StockPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
