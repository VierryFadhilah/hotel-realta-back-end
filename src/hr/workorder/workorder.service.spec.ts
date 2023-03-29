import { Test, TestingModule } from '@nestjs/testing';
import { WorkorderService } from './workorder.service';

describe('WorkorderService', () => {
  let service: WorkorderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkorderService],
    }).compile();

    service = module.get<WorkorderService>(WorkorderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
