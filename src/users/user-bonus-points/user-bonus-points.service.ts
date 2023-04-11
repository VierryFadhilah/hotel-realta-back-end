import { HttpStatus, Injectable } from '@nestjs/common';
import { user_bonus_points } from 'models/User/usersSchema';
import { CreateUserBonusPointDto } from './dto/create-user-bonus-point.dto';
import { UpdateUserBonusPointDto } from './dto/update-user-bonus-point.dto';
@Injectable()
export class UserBonusPointsService {
  async get() {
    return await user_bonus_points.findAll();
  }
  async createBonusPoint(
    createUserBonusPointDto: CreateUserBonusPointDto,
  ): Promise<any> {
    try {
      const userBonusPoint = new user_bonus_points();
      userBonusPoint.ubpo_created_on = new Date();
      Object.assign(user_bonus_points, createUserBonusPointDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'User Bonus Point success created',
      };
    } catch (e) {
      return e;
    }
  }
  //Kemudian kita menggunakan Object.assign() untuk menyalin properti dari objek createUserBonusPointDto ke objek userBonusPoint.
  //Terakhir, kita memanggil metode save() pada instance userBonusPointsRepository untuk menyimpan objek UserBonusPoint baru ke database.
  async getUserBonusPoints(user_id: number) {
    return await user_bonus_points.findAll();
  }

  async getUserBonusPointsById(id: number): Promise<any> {
    try {
      const result = await user_bonus_points.findByPk(+id);

      if (!result) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User Bonus Points not found',
          data: result,
        };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User Bonus Points found',
        data: result,
      };
    } catch (error) {
      return error;
    }
  }

  async updateUserBonusPoints(): Promise<any> {
    try {
      const userBonusPoint = new user_bonus_points();
      userBonusPoint.ubpo_created_on = new Date();
      return {
        statusCode: HttpStatus.OK,
        message: 'User Bonus Points updated successfully',
      };
    } catch (error) {
      return error;
    }
  }
}
