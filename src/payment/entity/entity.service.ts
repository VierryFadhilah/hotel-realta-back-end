import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { bank, entity, fintech } from 'models/schemaPayment';
@Injectable()
export class EntityService {
    constructor(
        @InjectModel(entity)
        private entityModel: typeof entity
      ){}
   
      async findAll() {
        try {
            const result:any = await this.entityModel.findAll({
                include: [
                  { model: bank },
                  { model: fintech }
                ],
              });
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
     
}
