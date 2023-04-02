import { Injectable } from '@nestjs/common';
import { CreatePaymentTransacationDto } from './dto/create-payment_transacation.dto';
import { UpdatePaymentTransacationDto } from './dto/update-payment_transacation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { payment_transaction, user_accounts } from 'models/schemaPayment';
import { Sequelize } from 'sequelize-typescript';
import { getTransactionNumber,  TransactionDate, OrderNumberToUp } from '../function/Function';

@Injectable()
export class PaymentTransacationService {
  constructor(
    @InjectModel(payment_transaction)
    private paymentModels: typeof payment_transaction,
    private sequelize: Sequelize,
  ) {}

  async create(payment: CreatePaymentTransacationDto) {
    try {
      const nextID: any = await this.sequelize.query(
        'SELECT COALESCE(MAX(part_id) + 1, 1) AS next_id FROM payment.payment_transaction',
      );
      const transactionID = nextID[0][0].next_id;
      const TransactionNumber = getTransactionNumber(
        transactionID,
        'TRX',
      );
      
      let TransactionNumberRef: string = Math.floor(
        Math.random() * 10 ** 15,
      ).toString();

      const date = new Date();
      let transactionType: string;
      let debit: string = '0';
      let credit: string = '0';
      let note: string;
      let OrderNumber:string;
      const PaymentName = 'TopuP';
      if(payment.transactionType === 'TP'){
        credit = payment.amount;
        OrderNumber = `${PaymentName.replace(' ', '')}_${OrderNumberToUp()}`;
      }

      const senders: any = await user_accounts.findOne({
        where: { usac_account_number: payment.sourceNumber },
      });

      if (+senders.usac_saldo < +payment.amount) {
        return {
          status: 404,
          message: 'saldo tidak mencukupi',
        };
      } else {
        const datas: any = parseInt(senders.usac_saldo) - parseInt(payment.amount);

        const sender: any = await user_accounts.update({usac_saldo: datas,},
          { where: { usac_account_number: payment.sourceNumber } },
        );

        const resives: any = await user_accounts.findOne({
          where: { usac_account_number: payment.targetNumber },
        });
        const rev: any = parseInt(resives.usac_saldo) + parseInt(payment.amount);
        const resive: any = await user_accounts.update(
          {
            usac_saldo: rev,
          },
          { where: { usac_account_number: payment.targetNumber } },
        );

        const result = await this.paymentModels.create({
          part_id: transactionID,
          part_trx_number: TransactionNumber,
          part_type: payment.transactionType,
          part_debet: debit,
          part_credit: credit,
          part_note: note,
          part_order_number: OrderNumber,
          part_source_id: payment.sourceNumber,
          part_target_id: payment.targetNumber,
          part_trx_number_ref: TransactionNumberRef,
          part_user_id: payment.userID,
        });

      // const result = await this.paymentModels.create()
      // const result = await this.sequelize.query(
      //   `CALL payment.InsertTopupuser(${Payment.userID}, '${Payment.transactionType}', ${Payment.amount}, '${Payment.sourceNumber}', '${Payment.targetNumber}')`,
      // );

      return {
        status: 200,
        message: 'success',
        data:result
      };
      }
    } catch (err) {
      return err;
    }
  }

  async createBooking(payment: CreatePaymentTransacationDto) {
    try {
      const cekAccounts: any = await user_accounts.findOne({
        where: { usac_account_number: payment.sourceNumber },
      });

      if (cekAccounts) {
        const orderType = payment.orderNumber.match(/(.*)#/)[1];
        const TransactionDateStr = payment.orderNumber.match(/#(.*)-/)[1];
        const TransactionDates = TransactionDate(TransactionDateStr);
        
        const nextID: any = await this.sequelize.query(
          'SELECT COALESCE(MAX(part_id) + 1, 1) AS next_id FROM payment.payment_transaction',
        );
        const transactionID = nextID[0][0].next_id;
        const TransactionNumber = getTransactionNumber(
          transactionID,
          'TRX',
          TransactionDates,
        );
        let TransactionNumberRef: string = Math.floor(
          Math.random() * 10 ** 15,
        ).toString();

        let NextTransactionNumber: string;
        let NextTransactionNumberRef: string = Math.floor(
          Math.random() * 10 ** 15,
        ).toString();

        let transactionType: string;
        let debit: string = '0';
        let credit: string = '0';
        let note: string;
        let HotelFacilityName: string;
        let HotelName: string;

        switch (orderType) {
          case 'MENUS':
            transactionType = 'ORM';
            credit = payment.amount;
            note = 'Resto';
            break;
          case 'BO':
            transactionType = 'TRB';
            credit = payment.amount;
            note = 'Bokking';
            break;
          default:
            break;
        }

        const senders: any = await user_accounts.findOne({
          where: { usac_account_number: payment.sourceNumber },
        });

        if (+senders.usac_saldo < +payment.amount) {
          return {
            status: 404,
            message: 'saldo tidak mencukupi',
          };
        } else {
          const datas: any = parseInt(senders.usac_saldo) - parseInt(payment.amount);

          const sender: any = await user_accounts.update({usac_saldo: datas,},
            { where: { usac_account_number: payment.sourceNumber } },
          );

          const resives: any = await user_accounts.findOne({
            where: { usac_account_number: payment.targetNumber },
          });
          const rev: any = parseInt(resives.usac_saldo) + parseInt(payment.amount);
          const resive: any = await user_accounts.update(
            {
              usac_saldo: rev,
            },
            { where: { usac_account_number: payment.targetNumber } },
          );

          const result = await this.paymentModels.create({
            part_id: transactionID,
            part_trx_number: TransactionNumber,
            part_type: transactionType,
            part_debet: debit,
            part_credit: credit,
            part_note: note,
            part_order_number: payment.orderNumber,
            part_source_id: payment.sourceNumber,
            part_target_id: payment.targetNumber,
            part_trx_number_ref: TransactionNumberRef,
            part_user_id: payment.userID,
          });

          return {
            status: 200,
            message: 'success',
            data: result,
          };
        }
      } else {
        return {
          status: 404,
          message: 'account bank tidak ada silahkan buat dulu',
        };
      }

    } catch (err) {
      return err;
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
