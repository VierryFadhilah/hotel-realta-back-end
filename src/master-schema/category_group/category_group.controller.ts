import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryGroupService } from './category_group.service';
import { CreateCategoryGroupDto } from './dto/create-category_group.dto';
import { UpdateCategoryGroupDto } from './dto/update-category_group.dto';

@Controller('category-group')
export class CategoryGroupController {
  constructor(private readonly categoryGroupService: CategoryGroupService) {}

  @Post()
  create(@Body() createCategoryGroupDto: CreateCategoryGroupDto) {
    return this.categoryGroupService.create(createCategoryGroupDto);
  }

  @Get()
  findAll() {
    return this.categoryGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryGroupDto: UpdateCategoryGroupDto) {
    return this.categoryGroupService.update(+id, updateCategoryGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryGroupService.remove(+id);
  }
}
