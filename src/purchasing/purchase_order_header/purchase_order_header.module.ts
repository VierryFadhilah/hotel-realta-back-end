import { Module } from '@nestjs/common';
import { PurchaseOrderHeaderService } from './purchase_order_header.service';
import { PurchaseOrderHeaderController } from './purchase_order_header.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { purchase_order_header } from 'models/purchasingSchema';

@Module({
  imports: [SequelizeModule.forFeature([purchase_order_header])],
  controllers: [PurchaseOrderHeaderController],
  providers: [PurchaseOrderHeaderService],
})
export class PurchaseOrderHeaderModule {}
