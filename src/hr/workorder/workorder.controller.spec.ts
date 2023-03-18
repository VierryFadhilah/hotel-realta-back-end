import { Test, TestingModule } from '@nestjs/testing';
import { WorkorderController } from './workorder.controller';
import { WorkorderService } from './workorder.service';

describe('WorkorderController', () => {
  let controller: WorkorderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkorderController],
      providers: [WorkorderService],
    }).compile();

    controller = module.get<WorkorderController>(WorkorderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
