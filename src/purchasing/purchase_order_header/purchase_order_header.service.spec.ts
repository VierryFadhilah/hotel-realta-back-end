import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseOrderHeaderService } from './purchase_order_header.service';

describe('PurchaseOrderHeaderService', () => {
  let service: PurchaseOrderHeaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseOrderHeaderService],
    }).compile();

    service = module.get<PurchaseOrderHeaderService>(
      PurchaseOrderHeaderService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
