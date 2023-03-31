import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PurchaseOrderDetailService } from './purchase_order_detail.service';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase_order_detail.dto';

@Controller('purchasing')
export class PurchaseOrderDetailController {
  constructor(
    private readonly purchaseOrderDetailService: PurchaseOrderDetailService,
  ) {}

  @Get('listOrderDetail')
  async getAll(): Promise<any[]> {
    const result = await this.purchaseOrderDetailService.listOrderDetail();
    return result;
  }

  @Post('purchase-order-detail')
  create(@Body() createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    return this.purchaseOrderDetailService.create(createPurchaseOrderDetailDto);
  }

  @Get('purchase-order-detail')
  findAll(@Query('page') page = 1, @Query('limit') limit = 5) {
    return this.purchaseOrderDetailService.findAll(page, limit);
  }

  @Get('purchase-order-detail/:id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderDetailService.findOne(+id);
  }

  @Put('purchase-order-detail/:id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderDetailDto: CreatePurchaseOrderDetailDto,
  ) {
    return this.purchaseOrderDetailService.update(
      +id,
      updatePurchaseOrderDetailDto,
    );
  }

  @Delete('purchase-order-detail/:id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderDetailService.remove(+id);
  }
}
