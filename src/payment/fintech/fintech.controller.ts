import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FintechService } from './fintech.service';
import { CreateFintechDto } from './dto/create-fintech.dto';
import { UpdateFintechDto } from './dto/update-fintech.dto';

@Controller('fintech')
export class FintechController {
  constructor(private readonly fintechService: FintechService) {}

  @Post()
  create(@Body() createFintechDto: CreateFintechDto) {
    return this.fintechService.create(createFintechDto);
  }

  @Get()
  findAll() {
    return this.fintechService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fintechService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFintechDto: UpdateFintechDto) {
    return this.fintechService.update(+id, updateFintechDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fintechService.remove(+id);
  }
}
