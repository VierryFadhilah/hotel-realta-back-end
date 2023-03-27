import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { WorkorderService } from './workorder.service';
import { CreateWorkorderDto } from './dto/create-workorder.dto';
import { UpdateWorkorderDto } from './dto/update-workorder.dto';

@Controller('hr/workorder')
export class WorkorderController {
  constructor(private readonly workorderService: WorkorderService) {}

  @Post()
  create(@Body() createWorkorderDto: CreateWorkorderDto) {
    return this.workorderService.create(createWorkorderDto);
  }
  @Post('detail')
  createDetail(@Body() body: any) {
    return this.workorderService.createDetail(body);
  }
  @Get('task')
  findTask(@Query() query: any) {
    return this.workorderService.findTask(query);
  }
  @Get('employee')
  finduser(@Query() query: any) {
    return this.workorderService.finduser(query);
  }
  @Get()
  findAll(
    @Query('page') page: number,
    @Query('entry') entry: number,
    @Query('status') status: string,
    @Query('from') from: any,
    @Query('to') to: any,
  ) {
    return this.workorderService.findAll(page, entry, status, from, to);
  }
  @Get('detail/:id')
  findDetail(@Param('id') id: number) {
    return this.workorderService.findDetail(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workorderService.findOne(+id);
  }

  @Put(':id')
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
