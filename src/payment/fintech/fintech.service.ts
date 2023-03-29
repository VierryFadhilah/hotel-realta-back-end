import { Injectable } from '@nestjs/common';
import { FintechDto } from './dto/fintech.dto';
import { InjectModel } from '@nestjs/sequelize';
import { entity, fintech } from 'models/schemaPayment';
import { Op } from 'sequelize';
@Injectable()
export class FintechService {
  constructor(
    @InjectModel(fintech)
    private fintechModel: typeof fintech
  ){}
  async create(fintechDto: FintechDto) {
    try {
      const entityId = await entity.create();
      const result = await this.fintechModel.create({
        paga_entity_id: entityId.entity_id,
        paga_code: fintechDto.paga_code,
        paga_name: fintechDto.paga_name
      })   

      return {
        status: 201,
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

  async findAll({search}) {
    try {
      const searchs = search || '';
      const result = await this.fintechModel.findAll(
        {
          where: {
            [Op.or]: [
              {
                paga_name: {
                  [Op.like]: '%' + searchs + '%',
                },
              },
            ],
          },
          order: [['paga_entity_id', 'DESC']],
        }
      )
      return {
        status: 200,
        message: "successfully",
        data: result
      }
    } catch (err) {
      return {
        status: 400,
        message: err
      }
    }
  }


  async findById(id:number){
    try {
      const result = await this.fintechModel.findOne({
        where:{paga_entity_id:id}
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


  async update(id: number, fintechDto: FintechDto) {
    try {
      const result = await this.fintechModel.update({
        paga_code: fintechDto.paga_code,
        paga_name: fintechDto.paga_name
      },{
        where:{paga_entity_id:id}
      })   

      return {
        status: 201,
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

  async remove(id: number) {
    try {
      const result = await this.fintechModel.destroy({
        where: { paga_entity_id: id },
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
