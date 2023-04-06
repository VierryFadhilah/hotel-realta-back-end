import { Controller, Body, Param, Put, Get, HttpStatus } from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { CreateUserPasswordDto } from './dto/create-user-password.dto';

@Controller('changePassword')
export class UserPasswordController {
  constructor(private readonly userPasswordService: UserPasswordService) {}

  @Put(':id')
  async createOrUpdate(
    @Param('id') id: string,
    @Body() createOrUpdateUserPasswordDto: CreateUserPasswordDto,
  ) {
    return await this.userPasswordService.createOrUpdate(
      createOrUpdateUserPasswordDto,
      +id,
    );
  }
}
