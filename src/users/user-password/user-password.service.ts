import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserPasswordDto } from './dto/create-user-password.dto';
import * as bcrypt from 'bcrypt';
import { user_password } from 'models/User/usersSchema';
import { MailingService } from '../mailing/mailing.service';
import { decode, sign, verify } from 'jsonwebtoken';
import { ResetPasswordDto } from './dto/reset-user-password.dto';
import { users } from 'models/User/usersSchema';

// user-password.service.ts
interface JwtPayload {
  user_email: string;
}
@Injectable()
export class UserPasswordService {
  constructor(private mailingService: MailingService) {}
  async findOne(user_id: number): Promise<any | null> {
    return await user_password.findOne({
      where: { uspa_user_id: user_id },
    });
  }
  async findPass(): Promise<any | null> {
    return await user_password.findAll();
  }

  async createOrUpdate(
    createUserPasswordDto: CreateUserPasswordDto,
    user_id?: number,
  ): Promise<any> {
    const user = await this.findOne(user_id);

    if (createUserPasswordDto.Password !== createUserPasswordDto.retypePass) {
      throw new BadRequestException(
        'Password and Confirm Password is not same',
      );
    }

    if (user !== null && user.uspa_passwordhash !== null) {
      const isCurrentPasswordSame = await bcrypt.compare(
        createUserPasswordDto.currentPassword,
        user.uspa_passwordhash,
      );

      if (!isCurrentPasswordSame) {
        throw new BadRequestException('Current password is wrong');
      }
    }

    const salt = await bcrypt.genSalt(10);
    const passHash = await bcrypt.hash(createUserPasswordDto.Password, salt);

    if (user === null) {
      await user_password.create({
        uspa_user_id: user_id,
        uspa_passwordhash: passHash,
        uspa_passwordsalt: salt,
      });
    } else {
      const berhasil = await user_password.update(
        {
          uspa_passwordhash: passHash,
          uspa_passwordsalt: salt,
        },
        { where: { uspa_user_id: user_id } },
      );
      return { message: 'berhasil', status: 200 };
    }
  }

  async forgotPassword(email: string) {
    try {
      // const token = Math.floor(1000 + Math.random() * 9000).toString();
      const user = await users.findOne({
        where: {
          user_email: email,
        },
      });

      if (!user) {
        return { statusCode: 404, message: 'User not found' };
      }

      const token = sign(
        {
          user_email: email,
        },
        process.env.SECRET_KEY,
      );

      await this.mailingService.sendEmail(email, token);

      return { statusCode: 200, message: 'An email has sent to your email' };
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const valid = verify(resetPasswordDto.token, process.env.SECRET_KEY);

      if (!valid) {
        return { statusCode: 401, message: 'Not Authorized' };
      }

      const data = decode(resetPasswordDto.token) as JwtPayload;

      const user = await users.findOne({
        where: {
          user_email: data.user_email,
        },
      });

      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(resetPasswordDto.password, salt);

      await user_password.update(
        { uspa_passwordhash: passHash, uspa_passwordsalt: salt },
        {
          where: {
            uspa_user_id: user.user_id,
          },
        },
      );

      return { statusCode: 200, message: 'Password Success Updated' };
    } catch (e) {
      return { statusCode: 400, message: e };
    }
  }
}
