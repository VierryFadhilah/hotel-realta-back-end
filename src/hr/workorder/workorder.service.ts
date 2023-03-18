import { Injectable } from '@nestjs/common';
import { CreateWorkorderDto } from './dto/create-workorder.dto';
import { UpdateWorkorderDto } from './dto/update-workorder.dto';

@Injectable()
export class WorkorderService {
  create(createWorkorderDto: CreateWorkorderDto) {
    return 'This action adds a new workorder';
  }

  findAll() {
    return {
      message: 'success',
      data: {
        workorder: [],
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} workorder`;
  }

  update(id: number, updateWorkorderDto: UpdateWorkorderDto) {
    return `This action updates a #${id} workorder`;
  }

  remove(id: number) {
    return `This action removes a #${id} workorder`;
  }
}
