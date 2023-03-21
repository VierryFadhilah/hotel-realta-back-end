import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { entity } from 'models/schemaPayment';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([entity])],
  controllers: [EntityController],
  providers: [EntityService]
})
export class EntityModule {}
