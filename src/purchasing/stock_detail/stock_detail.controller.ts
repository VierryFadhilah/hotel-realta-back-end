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
import { StockDetailService } from './stock_detail.service';
import { CreateStockDetailDto } from './dto/create-stock_detail.dto';

@Controller('purchasing/stock-detail')
export class StockDetailController {
  constructor(private readonly stockDetailService: StockDetailService) {}

  @Post()
  create(@Body() createStockDetailDto: CreateStockDetailDto) {
    return this.stockDetailService.create(createStockDetailDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 5) {
    return this.stockDetailService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockDetailService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockDetailDto: CreateStockDetailDto,
  ) {
    return this.stockDetailService.update(+id, updateStockDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockDetailService.remove(+id);
  }
}
