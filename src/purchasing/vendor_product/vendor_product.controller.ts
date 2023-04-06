import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { VendorProductService } from './vendor_product.service';
import { CreateVendorProductDto } from './dto/create-vendor_product.dto';

@Controller('purchasing/vendor-product')
export class VendorProductController {
  constructor(private readonly vendorProductService: VendorProductService) {}

  @Post()
  create(@Body() createVendorProductDto: CreateVendorProductDto) {
    return this.vendorProductService.create(createVendorProductDto);
  }

  // @Get()
  // async findAll(@Query('page') page = 1, @Query('limit') limit = 5) {
  //   return this.vendorProductService.findAll(page, limit);
  // }
  @Get()
  async findAll() {
    return this.vendorProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vendorProductService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVendorProductDto: CreateVendorProductDto,
  ) {
    return this.vendorProductService.update(+id, updateVendorProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vendorProductService.remove(+id);
  }
}
