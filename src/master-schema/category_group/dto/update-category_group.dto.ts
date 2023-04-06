import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryGroupDto } from './create-category_group.dto';

export class UpdateCategoryGroupDto extends PartialType(CreateCategoryGroupDto) {}
