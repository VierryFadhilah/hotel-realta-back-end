import { Test, TestingModule } from '@nestjs/testing';
import { PaymentTransacationController } from './payment_transacation.controller';
import { PaymentTransacationService } from './payment_transacation.service';

describe('PaymentTransacationController', () => {
  let controller: PaymentTransacationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentTransacationController],
      providers: [PaymentTransacationService],
    }).compile();

    controller = module.get<PaymentTransacationController>(PaymentTransacationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
