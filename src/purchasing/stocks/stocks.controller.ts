import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';

@Controller('purchasing')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post('stock')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get('veproStock')
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<any[]> {
    const result = await this.stocksService.stockVepro(page, limit);
    return result;
  }

  @Get('stock/:id')
  async stockDet(
    // @Query('page') page = 1,
    // @Query('limit') limit = 5,
    @Param('id') id: number,
  ): Promise<any[]> {
    const result = await this.stocksService.stockDet(id);
    return result;
  }

  @Get('stocks')
  getStock() {
    return this.stocksService.getAll();
  }

  @Get('stock')
  async findAll(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.stocksService.findAll(page, limit, search);
  }

  @Get('gallery')
  async gallery(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.stocksService.gallery(page, limit, search);
  }

  @Get('veproStock/:id')
  async getAllId(
    // @Query('page') page = 1,
    // @Query('limit') limit = 5,
    @Param('id') id: any,
  ): Promise<any[]> {
    const result = await this.stocksService.stockVeproId(id);
    return result;
  }

  @Get('veproStockId')
  async find(
    @Query('id') id: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.stocksService.stockVeproPag(page, limit, id);
  }

  @Get('stockDetail')
  async stockDetail(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<any[]> {
    const result = await this.stocksService.stockDetail(page, limit);
    return result;
  }

  @Get('stocks/:id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(+id);
  }

  @Get('search/:name')
  async findByStocksName(@Param('name') name: string) {
    const result = await this.stocksService.findByStocksName(name);
    if (!result) {
      throw new NotFoundException(`Stocks with name '${name}' not found`);
    }
    return result;
  }

  @Put('stock/:id')
  update(@Param('id') id: string, @Body() updateStockDto: CreateStockDto) {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete('stock/:id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(+id);
  }

  @Get('listOrderv')
  findAllListOrder() {
    return this.stocksService.getListOrder();
  }

  @Get('galleryv')
  findGallery() {
    return this.stocksService.getGallery();
  }

  @Get('listOrderDetailv')
  findList() {
    return this.stocksService.getListOrderDetail();
  }
}
