import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { bank } from 'models/schemaPayment/bank';
import { SequelizeModule } from '@nestjs/sequelize';



@Module({
  imports: [SequelizeModule.forFeature([bank])],
  controllers: [BankController],
  providers: [BankService]
})
export class BankModule {}
