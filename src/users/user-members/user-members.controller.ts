import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  // Delete,
} from '@nestjs/common';
import { UserMembersService } from './user-members.service';
import { CreateUserMemberDto } from './dto/create-user-member.dto';
import { UpdateUserMemberDto } from './dto/update-user-member.dto';
import { find } from 'rxjs';

@Controller('historyMembers')
export class UserMembersController {
  constructor(private readonly userMembersService: UserMembersService) {}

  @Post()
  createUserMembers(@Body() createUserMemberDto: CreateUserMemberDto) {
    return this.userMembersService.createUserMembers(createUserMemberDto);
  }

  @Get()
  getAll() {
    return this.userMembersService.getAll();
  }

  @Get(':id')
  getUserMemberById(@Param('id') id: string) {
    return this.userMembersService.getUserMemberById(+id);
  }

  @Put(':id')
  updateUserMember(
    @Param('id') id: string,
    @Body() updateUserMemberDto: UpdateUserMemberDto,
  ) {
    const userId = +id; // convert id string to number
    return this.userMembersService.updateUserMember(
      userId,
      updateUserMemberDto,
    );
  }
}

// @Delete(':id')
// remove(@Param('id') id: string) {
//   return this.userMembersService.remove(+id);
// }
