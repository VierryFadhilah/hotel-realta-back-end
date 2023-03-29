import { Module } from '@nestjs/common';
import { FintechService } from './fintech.service';
import { FintechController } from './fintech.controller';
import { fintech } from 'models/schemaPayment';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([fintech])],
  controllers: [FintechController],
  providers: [FintechService]
})
export class FintechModule {}
