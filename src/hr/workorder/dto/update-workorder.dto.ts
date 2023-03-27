import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkorderDto } from './create-workorder.dto';

export class UpdateWorkorderDto extends PartialType(CreateWorkorderDto) {}
