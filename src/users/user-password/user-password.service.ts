import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserPasswordDto } from './dto/create-user-password.dto';
import * as bcrypt from 'bcrypt';
import { user_password } from 'models/User/usersSchema';
// user-password.service.ts

@Injectable()
export class UserPasswordService {
  async findOne(user_id: number): Promise<any | null> {
    return await user_password.findOne({
      where: { uspa_user_id: user_id },
    });
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
}
