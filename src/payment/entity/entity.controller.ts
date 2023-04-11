import { Controller, Query,Get} from '@nestjs/common';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get()
  findAll():Promise<any> {
    return this.entityService.findAll();
  }
}
