import { Module } from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase_order_detail.service';
import { PurchaseOrderDetailController } from './purchase_order_detail.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { purchase_order_detail } from 'models/Purchasing/purchasingSchema';

@Module({
  imports: [SequelizeModule.forFeature([purchase_order_detail])],
  controllers: [PurchaseOrderDetailController],
  providers: [PurchaseOrderDetailService],
})
export class PurchaseOrderDetailModule {}
