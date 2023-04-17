import {
  Controller,
  Body,
  Param,
  Post,
  Put,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { CreateUserPasswordDto } from './dto/create-user-password.dto';
import { ResetPasswordDto } from './dto/reset-user-password.dto';

@Controller('changePassword')
export class UserPasswordController {
  constructor(private readonly userPasswordService: UserPasswordService) {}
  @Get()
  async findPass() {
    return await this.userPasswordService.findPass();
  }
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
  @Post('forgotPassword')
  forgotPassword(@Body() body: any) {
    const { email } = body;
    return this.userPasswordService.forgotPassword(email);
  }

  @Post('resetPassword')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.userPasswordService.resetPassword(resetPasswordDto);
  }
}
