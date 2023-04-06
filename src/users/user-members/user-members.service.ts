import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { user_members } from 'models/usersSchema';
import { CreateUserMemberDto } from './dto/create-user-member.dto';
import { UpdateUserMemberDto } from './dto/update-user-member.dto';

@Injectable()
export class UserMembersService {
  createUserMembers(createUserMemberDto: CreateUserMemberDto) {
    return user_members.create(createUserMemberDto);
  }
  getAll(): Promise<any> {
    return user_members.findAll();
  }

  getUserMemberById(user_id: number) {
    return user_members.findOne({
      where: {
        usme_user_id: user_id,
      },
    });
  }

  updateUserMember(id: number, updateUserMemberDto: UpdateUserMemberDto) {
    return user_members.update(updateUserMemberDto, {
      where: {
        usme_user_id: id,
        usme_memb_name: updateUserMemberDto.usme_memb_name,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} userMember`;
  // }
}
