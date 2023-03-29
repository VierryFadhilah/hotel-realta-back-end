import { Injectable } from '@nestjs/common';
import { UserAccountDto } from './dto/user_account.dto';
import { InjectModel } from '@nestjs/sequelize';
import { bank, user_accounts } from 'models/schemaPayment';
import { Sequelize } from 'sequelize-typescript';
@Injectable()
export class UserAccountsService {
  constructor(
    @InjectModel(user_accounts)
    private userModel: typeof user_accounts,
    private sequelize: Sequelize
  ){}

  async create(userAccountDto: UserAccountDto) {
    try {
      const result = await this.userModel.create({
        usac_entity_id: userAccountDto.usac_entity_id,
        usac_user_id: userAccountDto.usac_user_id,
        usac_account_number: userAccountDto.usac_account_number,
        usac_saldo: userAccountDto.usac_saldo,
        usac_type: userAccountDto.usac_type
      })
      return{
        status: 201,
        message: "successfully",
        data: result
      }
    
    } catch (err) {
      return{
        status: 400,
        message: err
      }
    }
  }

  //  async findAll() {
  //   try {
  //     const result = await this.userModel.findAll({
  //       attributes: ['usac_user_id','usac_account_number', 'usac_saldo', 'usac_type'],
  //       include:{
  //         model: bank,
  //         attributes: ['bank_name'],
  //       },
  //     });
  //     return {
  //       status: 200,
  //       message: "successfully",
  //       data: result
  //     }
  //   } catch (err) {
  //     return {
  //       status: 400,
  //       message: err
  //     }      
  //   }
  // }

  async findAll(){
    try {
      const result = await this.sequelize.query('SELECT * FROM  payment.user_accountfindall');
      return {
        status: 200,
        message: "successfully",
        data: result[0]
      }
    } catch (err) {
      return {
        status: 400,
        message: err,
      }
    }
  }

 async findOne(id: any) {
    try {
      const result = await this.sequelize.query(`SELECT * FROM payment.user_accountfindall WHERE  "accountNumber" = ${id}`);
      
      return {
        status: 200,
        message: "successfully",
        data: result
      }
    } catch (err) {
      return {
        status: 400,
        message: err,
      }
    }
  }

  update(id: number, userAccountDto: UserAccountDto) {
    return `This action updates a #${id} userAccount`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAccount`;
  }
}
