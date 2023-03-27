import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { hotels } from 'models/hotel_module';

@Module({
  imports: [SequelizeModule.forFeature([hotels])],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
