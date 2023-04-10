import { Module } from '@nestjs/common';
import { VendorProductService } from './vendor_product.service';
import { VendorProductController } from './vendor_product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { vendor_product } from 'models/Purchasing/purchasingSchema';

@Module({
  imports: [SequelizeModule.forFeature([vendor_product])],
  controllers: [VendorProductController],
  providers: [VendorProductService],
})
export class VendorProductModule {}
