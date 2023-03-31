import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { FintechService } from './fintech.service';
import { FintechDto } from './dto/fintech.dto';


@Controller('fintech')
export class FintechController {
  constructor(private readonly fintechService: FintechService) {}

  @Post()
  create(@Body() fintechDto: FintechDto) {
    return this.fintechService.create(fintechDto);
  }

  @Get()
  findAll( @Query('search') search: any):Promise<any> {
    return this.fintechService.findAll({search});
  }

  @Get(':id')
  findById(@Param('id') id: string){
    return this.fintechService.findById(+id)
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() fintechDto: FintechDto) {
    return this.fintechService.update(+id, fintechDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fintechService.remove(+id);
  }
}
