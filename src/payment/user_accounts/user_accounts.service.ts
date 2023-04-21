import { Injectable } from '@nestjs/common';
import { UserAccountDto } from './dto/user_account.dto';
import { InjectModel } from '@nestjs/sequelize';
import { bank, fintech, user_accounts } from 'models/schemaPayment';
import { Sequelize } from 'sequelize-typescript';
import { where } from 'sequelize';
import { users } from 'models/usersSchema';
@Injectable()
export class UserAccountsService {
  constructor(
    @InjectModel(user_accounts)
    private userModel: typeof user_accounts,
    private sequelize: Sequelize,
  ) {}

  async create(userAccountDto: UserAccountDto) {
    try {
      if (userAccountDto.usac_type === 'fintech') {

        const result = await this.userModel.create({
          usac_entity_id: userAccountDto.usac_entity_id,
          usac_user_id: userAccountDto.usac_user_id,
          usac_account_number: userAccountDto.usac_account_number,
          usac_saldo: userAccountDto.usac_saldo,
          usac_type: userAccountDto.usac_type,
        });

        return {
          status: 201,
          message: 'successfully',
          data: result,
        };
      } else {

        const Code = await bank.findOne({
          where: {bank_entity_id : userAccountDto.usac_entity_id },
        });
        const concat = Code.bank_code+userAccountDto.usac_account_number

        const result = await this.userModel.create({
          usac_entity_id: userAccountDto.usac_entity_id,
          usac_user_id: userAccountDto.usac_user_id,
          usac_account_number: concat,
          usac_saldo: userAccountDto.usac_saldo,
          usac_type: userAccountDto.usac_type,
          usac_expmonth: userAccountDto.usac_expmonth,
          usac_expyear: userAccountDto.usac_expyear
        });
        return {
          status: 201,
          message: 'successfully',
          data: result,
        };
      }
    } catch (err) {
      console.log(err);
      
      return {
        status: 400,
        message: err,
      };
    }
  }


  async findAll() {
    try {
      const result = await this.sequelize.query(
        `SELECT * FROM payment.user_accountfindall  WHERE  "userId" = '2'`,
      );
      return {
        status: 200,
        message: 'successfully',
        data: result[0],
      };
    } catch (err) {
      return {
        status: 400,
        message: err,
      };
    }
  }

  async findOne(id: any) {
    try {
      const result = await this.sequelize.query(
        `SELECT * FROM payment.user_accountfindall WHERE  "accountNumber" = '${id}'::text`,
      );
      return {
        status: 200,
        message: 'successfully',
        data: result[0],
      };
    } catch (err) {
      return {
        status: 400,
        message: err,
      };
    }
  }

  async update(id: string, userAccountDto: UserAccountDto) {
    try {
      console.log("tresss",id, userAccountDto);
      
      const accountById = await this.findOne(id)

      if(accountById){
        const result = await this.userModel.update(
          {
            usac_user_id: userAccountDto.usac_user_id,
            usac_account_number: userAccountDto.usac_account_number,
            usac_saldo: userAccountDto.usac_saldo,
            usac_type: userAccountDto.usac_type,
            usac_expmonth: userAccountDto.usac_expmonth,
            usac_expyear: userAccountDto.usac_expyear
          },
          {
            where: { usac_account_number: id },
          },
        );
        return {
          status: 201,
          message: 'successfully Update',
          data: result,
        };
      }
      
      
    } catch (err) {
      return {
        status: 400,
        message: err,
      };
    }
  }

  async remove(id: string) {
    try {
      const result = await this.userModel.destroy({
        where: { usac_account_number: id },
      });

      return {
        status: 204,
        message: 'delete successfully',
        data: result,
      };
    } catch (err) {
      return {
        status: 404,
        message: err,
      };
    }
  }

  async findUserAccount(id:number){
    try {
      const result = await users.findOne({
        where:{user_id: id}
      })
      return{
        status: 200,
        message: "success",
        data: result
      }
    } catch (err) {
      return {
        sataus: 400,
        message: err
      }
    }
  }

  async findConcat(source:any, target:any){
    const sources:any =  await this.sequelize.query(
      `SELECT * FROM payment.user_accountfindall  WHERE  "accountNumber" = '${source}'`,
    );

    const targets:any = await this.sequelize.query(
      `SELECT * FROM payment.user_accountfindall  WHERE  "accountNumber" = '${target}'`,
    );
    return ` Top Up ${sources[0][0].paymentName} To ${targets[0][0].paymentName}`
  }

  async findCount(saldo:any, amount:any ,sourceNumber:any, targetNumber:any ){
    const datas: any =
          parseInt(saldo) - parseInt(amount);

        const sender: any = await user_accounts.update(
          { usac_saldo: datas },
          { where: { usac_account_number: sourceNumber } },
        );

        const resives: any = await user_accounts.findOne({
          where: { usac_account_number: targetNumber },
        });
        const rev: any =
          parseInt(resives.usac_saldo) + parseInt(amount);

        const resive: any = await user_accounts.update(
          {
            usac_saldo: rev,
          },
          { where: { usac_account_number: targetNumber } },
        );
  }
}
