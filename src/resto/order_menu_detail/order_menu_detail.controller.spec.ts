import { Test, TestingModule } from '@nestjs/testing';
import { OrderMenuDetailController } from './order_menu_detail.controller';
import { OrderMenuDetailService } from './order_menu_detail.service';

describe('OrderMenuDetailController', () => {
  let controller: OrderMenuDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderMenuDetailController],
      providers: [OrderMenuDetailService],
    }).compile();

    controller = module.get<OrderMenuDetailController>(
      OrderMenuDetailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
