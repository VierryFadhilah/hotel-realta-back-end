import { Injectable } from '@nestjs/common';
import { CreatePaymentTransacationDto } from './dto/create-payment_transacation.dto';
import { UpdatePaymentTransacationDto } from './dto/update-payment_transacation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { bank, entity, fintech, payment_transaction, user_accounts } from 'models/schemaPayment';
import { Sequelize } from 'sequelize-typescript';
import {
  getTransactionNumber,
  TransactionDate,
  OrderNumberToUp,
  conCat,

} from '../function/Function';
import { Op } from 'sequelize';
import { users } from 'models/usersSchema';
import { UserAccountsService } from '../user_accounts/user_accounts.service';

@Injectable()
export class PaymentTransacationService {
  constructor(
    @InjectModel(payment_transaction)
    private paymentModels: typeof payment_transaction,
    private sequelize: Sequelize,
    private userAccountsService: UserAccountsService
  ) {}

  async create(payment: CreatePaymentTransacationDto) {
    try {
      const nextID: any = await this.sequelize.query(
        'SELECT COALESCE(MAX(part_id) + 1, 1) AS next_id FROM payment.payment_transaction',
      );
      const transactionID = nextID[0][0].next_id;
      const TransactionNumber = getTransactionNumber(transactionID, 'TRX');

    
      let TransactionNumberRef: string = Math.floor(
        Math.random() * 10 ** 15,
      ).toString();

      const date = new Date();
      let transactionType: string;
      let debit: string = '0';
      let credit: string = '0';
      let note: any;
      let OrderNumber: string;
      const PaymentName = 'TopuP';
      if (payment.transactionType === 'TP') {
        debit = payment.amount;
        credit = payment.amount;
        note = await this.userAccountsService.findConcat(payment.sourceNumber, payment.targetNumber)
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

       await this.userAccountsService.findCount(senders.usac_saldo,payment.amount,payment.sourceNumber, payment.targetNumber)

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

        // const nexttrxID: any = await this.sequelize.query(
        //   'SELECT COALESCE(MAX(part_id) + 1, 1) AS next_id FROM payment.payment_transaction',
        // );
        // const nextransactionID = nexttrxID[0][0].next_id;
        // const NextTransactionNumber = getTransactionNumber(nextransactionID, 'TRX');
  
        // const target = await this.paymentModels.create({
        //   part_id: nextransactionID,
        //   part_trx_number: NextTransactionNumber,
        //   part_type: payment.transactionType,
        
        //   part_credit: credit,
        //   part_note: note,
        //   part_order_number: OrderNumber,
        //   part_source_id: payment.sourceNumber,
        //   part_target_id: payment.targetNumber,
        //   part_trx_number_ref: TransactionNumberRef,
        //   part_user_id: payment.userID,
        // });

        return {
          status: 200,
          message: 'success',
          data: result,
          // datas: target,
        };
      }
    } catch (err) {
      return { status: 404, message: err };
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

          await this.userAccountsService.findCount(senders.usac_saldo,payment.amount,payment.sourceNumber, payment.targetNumber)

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

  async findAll(search?:any, page?:number, limit?:number, type?:string ) {
    try {
      const pages = page || 1;
      const limits = limit || 10;
      const types = type || '';
      const searchs = search || '';
      const offset = limits * pages;

      const totalRows = await this.paymentModels.count({
        include:{
          model: users
        },
        where: {
          [Op.or]: [
            {
              part_trx_number: {
                [Op.iLike]: '%' + searchs + '%',
              },
              part_type: {
                [Op.iLike]: '%' + types + '%',
              },
              part_user_id: 2,
            },
          ],
        
        },
      });

      const totalPage = Math.ceil(totalRows / limits);
      const result = await this.paymentModels.findAll({
        include:{
          model: users
        },
        where: {
          [Op.or]: [
            {
              part_trx_number: {
                [Op.iLike]: '%' + searchs + '%',
              },
              part_type: {
                [Op.iLike]: '%' + types + '%',
              },
              part_user_id: 2,
            },
          ],
        
        },
        offset: offset,
        limit: limit,
        order: [['part_trx_number', 'DESC']],
      });
      return {
        status: 200,
        message: 'success',
        data: result,
        page: pages,
        limit: limits,
        totalRows: totalRows,
        totalPage: totalPage,
      };
    } catch (err) {
      return {
        status: 400,
        message: err
      }
    }
  }

  async findAllTopUp(search?:any, page?:number, limit?:number) {
    try {
      const pages = page || 0;
      const limits = limit || 10;
      const searchs = search || '';
      const offset = limits * pages;
      const totalRows = await this.paymentModels.count({
        include:{
          model: users
        },
        where: {
          [Op.or]: [
            {
            
              part_source_id: {
                [Op.iLike]: '%' + searchs + '%',
              },
              part_type: "TP",
              part_user_id: 2,
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await this.paymentModels.findAll({
        include:{
          model: users
        },
        where: {
          [Op.or]: [
            {
              part_source_id: {
                [Op.iLike]: '%' + searchs + '%',
              },
              part_type: "TP",
              part_user_id: 2,
            },
          ],
        },
        offset: offset,
        limit: limit,
        order: [['part_modified_date', 'DESC']],
      });
      return {
        status: 200,
        message: 'success',
        data: result,
        page: pages,
        limit: limits,
        totalRows: totalRows,
        totalPage: totalPage,
      };
    } catch (err) {
      return {
        status: 400,
        message: err
      }
    }
  }


}
