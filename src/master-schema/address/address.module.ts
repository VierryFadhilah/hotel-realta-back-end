import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { address } from 'models/masterSchema';

@Module({
  imports: [SequelizeModule.forFeature([address])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
