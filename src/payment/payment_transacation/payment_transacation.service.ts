import { Injectable } from '@nestjs/common';
import { CreatePaymentTransacationDto } from './dto/create-payment_transacation.dto';
import { UpdatePaymentTransacationDto } from './dto/update-payment_transacation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { payment_transaction } from 'models/schemaPayment';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class PaymentTransacationService {
  constructor(
    @InjectModel(payment_transaction)
    private paymentModels: typeof payment_transaction,
    private sequelize: Sequelize,
  ) {}

  async create(Payment: CreatePaymentTransacationDto) {
    console.log(Payment);
    try {
      
      // const result = await this.paymentModels.create()
      const result =  await this.sequelize.query(
        `CALL payment.InsertTopupuser(${Payment.userID}, '${Payment.transactionType}', ${Payment.amount}, '${Payment.sourceNumber}', '${Payment.targetNumber}')`,
        
      ).then(data=>{
        
      });
      return {
        status: 200,
        message: 'success',
     
      };
    } catch (err) {
      return err
    }

  
  }
  async findAll() {
    try {
      const result = await this.paymentModels.findAll();
      return {
        status: 200,
        message: 'success',
        data: result,
      };
    } catch (err) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentTransacation`;
  }

  update(
    id: number,
    updatePaymentTransacationDto: UpdatePaymentTransacationDto,
  ) {
    return `This action updates a #${id} paymentTransacation`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentTransacation`;
  }
}
