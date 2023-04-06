import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderHeaderController } from './purchase_order_header.controller';
import { PurchaseOrderHeaderService } from './purchase_order_header.service';

describe('PurchaseOrderHeaderController', () => {
  let controller: PurchaseOrderHeaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseOrderHeaderController],
      providers: [PurchaseOrderHeaderService],
    }).compile();

    controller = module.get<PurchaseOrderHeaderController>(
      PurchaseOrderHeaderController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
