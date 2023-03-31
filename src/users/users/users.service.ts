import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Op } from 'sequelize';
import { users } from 'models/usersSchema';

@Injectable()
export class UsersService {
  async getUserByName(search: string) {
    try {
      const result = await users.findAll({
        where: {
          user_full_name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        limit: 5,
      });
      const resultList = [];
      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        resultList.push({
          user_id: element.user_id,
          user_full_name: element.user_full_name,
        });
      }

      if (result.length === 0) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Users Not Found',
          data: resultList,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Users Found',
        data: resultList,
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
