import { Module } from '@nestjs/common';
import { PaymentTransacationService } from './payment_transacation.service';
import { PaymentTransacationController } from './payment_transacation.controller';
import { payment_transaction } from 'models/schemaPayment';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([payment_transaction])],
  controllers: [PaymentTransacationController],
  providers: [PaymentTransacationService]
})
export class PaymentTransacationModule {}
