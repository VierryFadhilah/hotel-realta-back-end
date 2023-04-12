import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { roles } from 'models/User/usersSchema';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  async createRoles(createRoleDto: CreateRoleDto): Promise<any> {
    try {
      await roles.create(createRoleDto);

      return { statusCode: HttpStatus.OK, message: 'Role success created' };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  async getAllRoles(): Promise<any> {
    try {
      const result = await roles.findAll();

      if (result.length === 0) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'Roles not found' };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Roles Found',
        data: result,
      };
    } catch (e) {
      return e;
    }
  }

  async getRoleById(id: number): Promise<any> {
    try {
      const result = await roles.findByPk(+id);

      if (result === null) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'Role not found' };
      }

      return { statusCode: HttpStatus.OK, message: 'Role found', data: result };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }
}

// update(id: number, updateRoleDto: UpdateRoleDto) {
//   return `This action updates a #${id} role`;
// }

// remove(id: number) {
//   return `This action removes a #${id} role`;
// }}
