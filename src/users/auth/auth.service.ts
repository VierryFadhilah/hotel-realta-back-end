import { Injectable, HttpStatus } from '@nestjs/common';
import { LoginEmployeeDto } from './dto/loginEmployee.dto';
import { LoginGuestDto } from './dto/loginGuest.dto';
import { InjectModel } from '@nestjs/sequelize';
import { user_password, user_roles, users } from 'models/User/usersSchema';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { log } from 'console';

@Injectable()
export class AuthService {
  async loginEmployee(loginEmployeeDto: LoginEmployeeDto) {
    try {
      const user = await users.findOne({
        where: {
          user_email: loginEmployeeDto.email,
        },
      });

      if (user === null) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
      }

      const userRole = await user_roles.findOne({
        where: { usro_user_id: user.user_id },
      });

      const userPassword = await user_password.findOne({
        where: { uspa_user_id: user.user_id },
      });

      if (userPassword === null) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Password is wrong',
        };
      }

      const isValid = await bcrypt.compare(
        loginEmployeeDto.password,
        userPassword.uspa_passwordhash,
      );

      if (!isValid) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Password is wrong',
        };
      }

      console.log(userRole);

      const token = sign(
        {
          user_id: user.user_id,
          user_full_name: user.user_full_name,
          user_email: user.user_email,
          user_phone_number: user.user_phone_number,
          user_role_id: userRole.usro_role_id,
          user_hotel_id: user.user_hotel_id,
          user_modified_date: user.user_modified_date,
        },
        process.env.SECRET_KEY,
      );

      console.log(token);
      return { statusCode: HttpStatus.OK, token: token, id: user.user_id };
    } catch (e) {
      return e;
    }
  }

  async loginGuest(loginGuestDto: LoginGuestDto) {
    // console.log('loginGuestDto', loginGuestDto);

    try {
      const user = await users.findOne({
        where: { user_phone_number: loginGuestDto.phone_number },
      });
      // console.log(user);

      if (user === null) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Phone number is not registered',
        };
      }

      const userRole = await user_roles.findOne({
        where: { usro_user_id: user.user_id },
      });
      console.log(userRole);

      const token = sign(
        {
          user_id: user.user_id,
          user_full_name: user.user_full_name,
          user_email: user.user_email,
          user_phone_number: user.user_phone_number,
          user_role_id: userRole.usro_role_id,
          user_hotel_id: user.user_hotel_id,
          user_modified_date: user.user_modified_date,
        },
        process.env.SECRET_KEY,
      );

      return { statusCode: HttpStatus.OK, token: token, id: user.user_id };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }
}
