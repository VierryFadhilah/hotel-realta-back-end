import { Module } from '@nestjs/common';
import { PaymentTransacationService } from './payment_transacation.service';
import { PaymentTransacationController } from './payment_transacation.controller';
import { payment_transaction, user_accounts } from 'models/schemaPayment';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserAccountsService } from '../user_accounts/user_accounts.service';

@Module({
  imports: [SequelizeModule.forFeature([payment_transaction,user_accounts])],
  controllers: [PaymentTransacationController],
  providers: [PaymentTransacationService, UserAccountsService]
})
export class PaymentTransacationModule {}
