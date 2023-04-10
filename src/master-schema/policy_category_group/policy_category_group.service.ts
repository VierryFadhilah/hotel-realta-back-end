import { Injectable } from '@nestjs/common';
import { CreatePolicyCategoryGroupDto } from './dto/create-policy_category_group.dto';
import { UpdatePolicyCategoryGroupDto } from './dto/update-policy_category_group.dto';

@Injectable()
export class PolicyCategoryGroupService {
  create(createPolicyCategoryGroupDto: CreatePolicyCategoryGroupDto) {
    return 'This action adds a new policyCategoryGroup';
  }

  findAll() {
    return `This action returns all policyCategoryGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} policyCategoryGroup`;
  }

  update(id: number, updatePolicyCategoryGroupDto: UpdatePolicyCategoryGroupDto) {
    return `This action updates a #${id} policyCategoryGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} policyCategoryGroup`;
  }
}
