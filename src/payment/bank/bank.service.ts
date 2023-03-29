import { Injectable } from '@nestjs/common';
import { BankDto } from './dto/bank.dto';
import { bank, entity } from 'models/schemaPayment';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class BankService {
  constructor(
    @InjectModel(bank)
    private bankModel: typeof bank,
  ) {}

  async create(bankDto: BankDto) {
    try {
      const entityId = await entity.create();
      const result = await this.bankModel.create({
        bank_entity_id: entityId.entity_id,
        bank_name: bankDto.bank_name,
        bank_code: bankDto.bank_code,
      });
      return {
        status: 201,
        message: 'success',
        data: result,
      };
    } catch (err) {
      return {
        status: 400,
        message: err,
      };
    }
  }

  async findAll({search}) {
    try {
      const searchs = search || '';
      const result = await this.bankModel.findAll({
        where: {
          [Op.or]: [
            {
              bank_name: {
                [Op.like]: '%' + searchs + '%',
              },
            },
          ],
        },
        order: [['bank_entity_id', 'DESC']],
      });
      return {
        status: 200,
        message: 'succes',
        data: result,
      };
    } catch (err) {
      return {
        status: 400,
        message: err,
      };
    }
  }

  async findById(id:number){
    try {
      const result = await this.bankModel.findOne({
        where:{bank_entity_id:id}
      })
      return {
        status: 200,
        message: "succesfully",
        data: result
      }
    } catch (err) {
      return{
        status: 400,
        message: err
      }
    }
  }

  async update(id: number, bankDto: BankDto) {
    try {
      const result = await this.bankModel.update(
        {
          bank_name: bankDto.bank_name,
          bank_code: bankDto.bank_code,
        },
        {
          where: { bank_entity_id: id },
        },
      );
      return {
        status: 202,
        message: 'updated successfully',
        data: result,
      };
    } catch (err) {}
  }

  async remove(id: number) {
    try {
      const result = await this.bankModel.destroy({
        where: { bank_entity_id: id },
      });

      const entityId = await entity.destroy({
        where: { entity_id: id },
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
}
