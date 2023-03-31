import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTransacationService } from './payment_transacation.service';

describe('PaymentTransacationService', () => {
  let service: PaymentTransacationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentTransacationService],
    }).compile();

    service = module.get<PaymentTransacationService>(PaymentTransacationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
