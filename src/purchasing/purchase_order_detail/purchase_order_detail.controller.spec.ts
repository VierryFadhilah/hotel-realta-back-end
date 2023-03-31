import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderDetailController } from './purchase_order_detail.controller';
import { PurchaseOrderDetailService } from './purchase_order_detail.service';

describe('PurchaseOrderDetailController', () => {
  let controller: PurchaseOrderDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderDetailController],
      providers: [PurchaseOrderDetailService],
    }).compile();

    controller = module.get<PurchaseOrderDetailController>(
      PurchaseOrderDetailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
