import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolicyCategoryGroupService } from './policy_category_group.service';
import { CreatePolicyCategoryGroupDto } from './dto/create-policy_category_group.dto';
import { UpdatePolicyCategoryGroupDto } from './dto/update-policy_category_group.dto';

@Controller('policy-category-group')
export class PolicyCategoryGroupController {
  constructor(private readonly policyCategoryGroupService: PolicyCategoryGroupService) {}

  @Post()
  create(@Body() createPolicyCategoryGroupDto: CreatePolicyCategoryGroupDto) {
    return this.policyCategoryGroupService.create(createPolicyCategoryGroupDto);
  }

  @Get()
  findAll() {
    return this.policyCategoryGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.policyCategoryGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolicyCategoryGroupDto: UpdatePolicyCategoryGroupDto) {
    return this.policyCategoryGroupService.update(+id, updatePolicyCategoryGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.policyCategoryGroupService.remove(+id);
  }
}
