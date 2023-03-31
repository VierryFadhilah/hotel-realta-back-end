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
} from 'models/usersSchema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import { UpdateUserDto } from './dto/update-user.dto';
import e from 'express';
import { unlink } from 'fs';

@Injectable()
export class UsersService {
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
      return {
        statusCode: 200,
        message: 'Employee success created',
      };
    } catch (error) {
      return error;
    }
  }
  async getUserById(id: number) {
    return await users.findOne({ where: { user_id: id } });
  }

  async signupGuest(signupGuest: SignupGuest) {
    try {
      console.log('terpanggil');
      const result = await users.create({
        user_phone_number: signupGuest.phone_number,
      });
      return { statusCode: 201, message: 'Guest success created' };
    } catch (e) {}
    return { statusCode: HttpStatus.BAD_REQUEST, message: e };
  }

  async findAll() {
    return await users.findAll();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, file: any) {
    try {
      console.log(file);
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
