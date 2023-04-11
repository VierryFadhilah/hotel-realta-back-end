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
import { RestoMenusService } from './resto_menus.service';
import { CreateRestoMenuDto } from './dto/create-resto_menu.dto';
import { UpdateRestoMenuDto } from './dto/update-resto_menu.dto';

@Controller('resto-menus')
export class RestoMenusController {
  constructor(private readonly restoMenusService: RestoMenusService) {}

  @Get()
  async findAndSearch(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.restoMenusService.findAndSearch(search, page, limit);
  }

  // @Get(':reme_name')
  // findOne(@Param('reme_name') reme_name: any) {
  //   return this.restoMenusService.findOne(reme_name);
  // }
  @Get('photo')
  findAll(): Promise<any[]> {
    return this.restoMenusService.findAllInclude();
  }

  @Post()
  create(@Body() createRestoMenuDto: CreateRestoMenuDto) {
    return this.restoMenusService.create(createRestoMenuDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestoMenuDto: UpdateRestoMenuDto,
  ) {
    return this.restoMenusService.update(+id, updateRestoMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restoMenusService.remove(+id);
  }
}
