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

type FindOne = {
  reme_name: string;
  page: number;
  entry: number;
};

@Controller('resto-menus')
export class RestoMenusController {
  constructor(private readonly restoMenusService: RestoMenusService) {}

  @Post()
  create(@Body() createRestoMenuDto: CreateRestoMenuDto) {
    return this.restoMenusService.create(createRestoMenuDto);
  }

  // @Get()
  // findAll() {
  //   return this.restoMenusService.findAll();
  // }
  @Get('search')
  find(@Query() query: FindOne) {
    return this.restoMenusService.findOne(
      query.reme_name,
      query.page,
      query.entry,
    );
  }
  @Get()
  async findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.restoMenusService.findAll(page, limit);
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
