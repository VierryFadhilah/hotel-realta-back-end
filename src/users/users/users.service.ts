import {
  HttpStatus,
  Injectable,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
// import { CreateUserDto } from './dto/signUpEmployee.dto';
import { SignupGuest } from './dto/signUpGuest.dto copy';
import { SignupEmployee } from './dto/signUpEmployee.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import {
  users,
  user_password,
  user_roles,
  user_profiles,
} from 'models/User/usersSchema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { UpdateUserDto } from './dto/update-user.dto';
import e from 'express';
import { unlink } from 'fs';
import { Op, QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { employee } from 'models/humanResourceSchema';

@Injectable()
export class UsersService {
  constructor(private sequelize: Sequelize) {}
  async getUserByName(search: string) {
    try {
      const result = await users.findAll({
        where: {
          user_full_name: {
            [Op.iLike]: `%${search}%`,
          },
          '$employee.emp_id$': null,
        },
        limit: 5,
        include: [
          {
            model: employee,
            attributes: ['emp_id'],
          },
        ],
      });
      // // console.log(result);
      // return result;
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
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }

  async signupEmployee(signupEmployee: SignupEmployee): Promise<any> {
    // your signupEmployee code here
    try {
      console.log('terpanggil');
      if (signupEmployee.password !== signupEmployee.confirm_password) {
        return {
          statusCode: HttpStatus.ACCEPTED,
          message: 'Password is not the same',
        };
      }
      const salt = await bcrypt.genSalt();
      const passHash = await bcrypt.hash(signupEmployee.password, salt);
      const result = await users.create({
        user_full_name: signupEmployee.username,
        user_email: signupEmployee.email,
        user_phone_number: signupEmployee.phone_number,
      });
      const password = await user_password.create({
        uspa_user_id: result.user_id,
        uspa_passwordhash: passHash,
        uspa_passwordsalt: salt,
      });
      const role = await user_roles.create({
        usro_user_id: result.user_id,
        usro_role_id: 1,
      });
      const uspro = await user_profiles.create({
        uspro_user_id: result.user_id,
      });
      return {
        statusCode: 200,
        message: 'Employee success created',
      };
    } catch (error) {
      return error;
    }
  }
  async getUserJoinById(id: number) {
    const result = await this.sequelize.query(
      'SELECT * FROM users.get_user_data(:user_id);',
      {
        replacements: {
          user_id: id,
        },
        type: QueryTypes.SELECT,
      },
    );
    return result[0];
  }
  async getUserById(id: number) {
    return await users.findOne({
      include: [{ model: user_profiles }],
      where: { user_id: id },
    });
  }

  async signupGuest(signupGuest: SignupGuest) {
    try {
      console.log('signup guest', signupGuest);
      const result = await users.create({
        user_phone_number: signupGuest.phone_number,
      });
      const role = await user_roles.create({
        usro_user_id: result.user_id,
        usro_role_id: 1,
      });
      return { statusCode: 201, message: 'Guest success created' };
    } catch (e) {}
    return { statusCode: HttpStatus.BAD_REQUEST, message: 'already created' };
  }

  async findAll() {
    return await users.findAll({
      include: [{ model: user_profiles }],
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, file: any) {
    try {
      await users.update(
        {
          user_full_name: updateUserDto.username,
          user_type: updateUserDto.type,
          user_phone_number: updateUserDto.phoneNumber,
          user_email: updateUserDto.email,
          user_company_name: updateUserDto.company,
          user_photo_profile: updateUserDto.photoProfile,
          user_modified_date: new Date(),
          user_hotel_id: updateUserDto.hotelId,
        },
        { where: { user_id: id } },
      );

      await user_profiles.update(
        {
          uspro_national_id: updateUserDto.nationalId,
          uspro_job_title: updateUserDto.jobTitle,
          uspro_gender: updateUserDto.gender,
          uspro_birt_date: updateUserDto.birthDate,
          uspro_marital_status: updateUserDto.MaritalStat,
        },
        { where: { uspro_user_id: id } },
      );

      await user_roles.update(
        {
          usro_role_id: updateUserDto.UroleId,
        },
        { where: { usro_role_id: id } },
      );
      return { statusCode: HttpStatus.OK, message: 'User success update' };
    } catch (e) {
      return e;
    }
  }
}
