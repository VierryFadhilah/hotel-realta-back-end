import { Injectable } from '@nestjs/common';
import { CreateFintechDto } from './dto/create-fintech.dto';
import { UpdateFintechDto } from './dto/update-fintech.dto';

@Injectable()
export class FintechService {
  create(createFintechDto: CreateFintechDto) {
    return 'This action adds a new fintech';
  }

  findAll() {
    return `This action returns all fintech`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fintech`;
  }

  update(id: number, updateFintechDto: UpdateFintechDto) {
    return `This action updates a #${id} fintech`;
  }

  remove(id: number) {
    return `This action removes a #${id} fintech`;
  }
}
