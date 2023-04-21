import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  HttpStatus,
  UseInterceptors,
  UnsupportedMediaTypeException,
  FileTypeValidator,
  ParseIntPipe,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  Req,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { SignupEmployee } from './dto/signUpEmployee.dto';
import { SignupGuest } from './dto/signUpGuest.dto copy';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('usersByName')
  getUsersByName(@Query('search') search: string) {
    return this.usersService.getUserByName(search);
  }

  @Post('signupEmployee')
  async signupEmployee(@Body() signupEmployee: SignupEmployee) {
    return this.usersService.signupEmployee(signupEmployee);
  }
  @Post('signupGuest')
  async signupGuest(@Body() signupGuest: SignupGuest) {
    return this.usersService.signupGuest(signupGuest);
  }

  @Get('find')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile/:id')
  async getUserByIdProfile(@Param('id') id: string) {
    try {
      const result = await this.usersService.getUserJoinById(+id);

      if (result.length === 0) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User found',
        data: result,
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const result = await this.usersService.getUserById(+id);
      if (!result) {
        return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'User found',
        data: result,
      };
    } catch (e) {
      return { statusCode: HttpStatus.BAD_REQUEST, message: e };
    }
    return this.usersService.findOne(+id);
  }

  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('photoProfile', {
      fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(
            new UnsupportedMediaTypeException('File is not an image'),
            false,
          );
        }

        callback(null, true);
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: './uploads/image/users',
        filename(req, file, callback) {
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
          callback(
            null,
            uniqueSuffix + '.' + file.originalname.split('.').pop(),
          );
        },
      }),
    }),
  )
  async updateUser(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      return this.usersService.updateUser(id, updateUserDto, file);
    } catch (e) {
      throw e;
    }
  }
}
