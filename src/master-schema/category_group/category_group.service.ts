import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryGroupDto } from './dto/create-category_group.dto';
import { UpdateCategoryGroupDto } from './dto/update-category_group.dto';
import { category_group } from 'models/masterSchema';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CategoryGroupService {
  constructor(
    @InjectModel(category_group)
    private categoryGroupModel: typeof category_group,
  ) {}

  async create(createCategoryGroupDto: CreateCategoryGroupDto) {
    try {
      console.log(createCategoryGroupDto);
      return await category_group.create(category_group);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await category_group.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(cagro_id: number) {
    try {
      return await category_group.findOne({
        where: { cagro_id },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateCategoryGroupDto: UpdateCategoryGroupDto) {
    try {
      const cagro = await this.findOne(id);
      return await cagro.update(updateCategoryGroupDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const cagro = await this.findOne(id);
      await cagro.destroy();
      return `This action removes a #${id} categoryGroup`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
