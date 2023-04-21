import { Test, TestingModule } from '@nestjs/testing';
import { BookhotelsService } from './bookhotels.service';

describe('BookhotelsService', () => {
  let service: BookhotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookhotelsService],
    }).compile();

    service = module.get<BookhotelsService>(BookhotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
