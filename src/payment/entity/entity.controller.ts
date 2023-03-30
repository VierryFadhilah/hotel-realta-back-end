import { Controller} from '@nestjs/common';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

}
