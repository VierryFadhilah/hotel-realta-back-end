import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WorkorderService } from './workorder.service';
import { CreateWorkorderDto } from './dto/create-workorder.dto';
import { UpdateWorkorderDto } from './dto/update-workorder.dto';

@Controller('workorder')
export class WorkorderController {
  constructor(private readonly workorderService: WorkorderService) {}

  @Post()
  create(@Body() createWorkorderDto: CreateWorkorderDto) {
    return this.workorderService.create(createWorkorderDto);
  }

  @Get()
  findAll(@Query('page') page: number) {
    return this.workorderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workorderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkorderDto: UpdateWorkorderDto,
  ) {
    return this.workorderService.update(+id, updateWorkorderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workorderService.remove(+id);
  }
}
