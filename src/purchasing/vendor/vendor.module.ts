import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { vendor } from 'models/Purchasing/purchasingSchema';
@Module({
  imports: [SequelizeModule.forFeature([vendor])],
  controllers: [VendorController],
  providers: [VendorService],
  exports: [SequelizeModule],
})
export class VendorModule {}
