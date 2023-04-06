import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { PurchaseOrderHeaderService } from './purchase_order_header.service';
import { CreatePurchaseOrderHeaderDto } from './dto/create-purchase_order_header.dto';

@Controller('purchasing')
export class PurchaseOrderHeaderController {
  constructor(
    private readonly purchaseOrderHeaderService: PurchaseOrderHeaderService,
  ) {}

  @Post('purchase-order-header')
  create(@Body() createPurchaseOrderHeaderDto: CreatePurchaseOrderHeaderDto) {
    return this.purchaseOrderHeaderService.create(createPurchaseOrderHeaderDto);
  }

  @Get('listOrder/:po')
  async getAll(
    // @Query('page') page = 1,
    // @Query('limit') limit = 5,
    @Param('po') po: string,
  ): Promise<any[]> {
    const result = await this.purchaseOrderHeaderService.listOrderDetail(
      // page,
      // limit,
      po,
    );
    return result;
  }

  @Get('purchase-order-header')
  findAll(@Query('page') page = 1, @Query('limit') limit = 5) {
    return this.purchaseOrderHeaderService.findAll(page, limit);
  }

  @Get('purchase-order-header/:id')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderHeaderService.findOne(+id);
  }

  @Put('purchase-order-header/:id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseOrderHeaderDto: CreatePurchaseOrderHeaderDto,
  ) {
    return this.purchaseOrderHeaderService.update(
      +id,
      updatePurchaseOrderHeaderDto,
    );
  }

  // @Put('purchase-order-header/status/:id')
  // updateStatus(
  //   @Param('id') id: string,
  //   @Body() updatePurchaseOrderHeaderDto: CreatePurchaseOrderHeaderDto,
  // ) {
  //   return this.purchaseOrderHeaderService.update(
  //     +id,
  //     updatePurchaseOrderHeaderDto,
  //   );
  // }

  @Delete('purchase-order-header/:id')
  remove(@Param('id') id: string) {
    return this.purchaseOrderHeaderService.remove(+id);
  }
}
