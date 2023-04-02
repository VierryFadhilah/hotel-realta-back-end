import { Module } from '@nestjs/common';
import { BankModule } from './bank/bank.module';
import { EntityModule } from './entity/entity.module';
import { FintechModule } from './fintech/fintech.module';
import { PaymentTransacationModule } from './payment_transacation/payment_transacation.module';
import { UserAccountsModule } from './user_accounts/user_accounts.module';

@Module({
  imports: [
    BankModule,
    EntityModule,
    FintechModule,
    UserAccountsModule,
    PaymentTransacationModule,
  ],
 
})
export class PaymentModule {}
