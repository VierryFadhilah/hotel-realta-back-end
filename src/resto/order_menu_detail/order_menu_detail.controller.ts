import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderMenuDetailService } from './order_menu_detail.service';
import { CreateOrderMenuDetailDto } from './dto/create-order_menu_detail.dto';
import { UpdateOrderMenuDetailDto } from './dto/update-order_menu_detail.dto';

@Controller('order-menu-detail')
export class OrderMenuDetailController {
  constructor(
    private readonly orderMenuDetailService: OrderMenuDetailService,
  ) {}

  @Post()
  create(@Body() createOrderMenuDetailDto: CreateOrderMenuDetailDto[]) {
    return this.orderMenuDetailService.create(createOrderMenuDetailDto);
  }

  @Get()
  findAll() {
    return this.orderMenuDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderMenuDetailService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderMenuDetailDto: UpdateOrderMenuDetailDto,
  ) {
    return this.orderMenuDetailService.update(+id, updateOrderMenuDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderMenuDetailService.remove(+id);
  }
}
