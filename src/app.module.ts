import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BankModule } from './payment/bank/bank.module';
import { EntityModule } from './payment/entity/entity.module';
import { FintechModule } from './payment/fintech/fintech.module';
import { UserAccountsModule } from './payment/user_accounts/user_accounts.module';
import { PaymentTransacationModule } from './payment/payment_transacation/payment_transacation.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    BankModule,
    EntityModule,
    FintechModule,
    UserAccountsModule,
    PaymentTransacationModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
