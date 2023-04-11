import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  purchase_order_detail,
  purchase_order_header,
  stock_detail,
  stock_photo,
  stocks,
  vendor,
  vendor_product,
} from 'models/Purchasing/purchasingSchema';
import { PurchaseOrderDetailModule } from './purchase_order_detail/purchase_order_detail.module';
import { PurchaseOrderHeaderModule } from './purchase_order_header/purchase_order_header.module';
import { StockDetailModule } from './stock_detail/stock_detail.module';
import { StockPhotoModule } from './stock_photo/stock_photo.module';
import { StocksModule } from './stocks/stocks.module';
import { VendorProductModule } from './vendor_product/vendor_product.module';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      purchase_order_detail,
      purchase_order_header,
      stock_detail,
      stock_photo,
      stocks,
      vendor_product,
      vendor,
    ]),
    PurchaseOrderDetailModule,
    PurchaseOrderHeaderModule,
    StockDetailModule,
    StockPhotoModule,
    StocksModule,
    VendorProductModule,
    VendorModule,
  ],
})
export class PurchasingModule {}
