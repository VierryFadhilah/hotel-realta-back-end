import { Test, TestingModule } from '@nestjs/testing';
import { BookhotelsController } from './bookhotels.controller';
import { BookhotelsService } from './bookhotels.service';

describe('BookhotelsController', () => {
  let controller: BookhotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookhotelsController],
      providers: [BookhotelsService],
    }).compile();

    controller = module.get<BookhotelsController>(BookhotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
