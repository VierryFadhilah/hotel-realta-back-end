import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UserBonusPointsService } from './user-bonus-points.service';
import { CreateUserBonusPointDto } from './dto/create-user-bonus-point.dto';
import { UpdateUserBonusPointDto } from './dto/update-user-bonus-point.dto';

@Controller('user-bonus-points')
export class UserBonusPointsController {
  constructor(
    private readonly userBonusPointsService: UserBonusPointsService,
  ) {}

  @Post('createBonusPoint')
  async createBonusPoint(
    // eslint-disable-next-line prettier/prettier
    @Body() createUserBonusPointDto: CreateUserBonusPointDto,
  ) {
    await this.userBonusPointsService.createBonusPoint(createUserBonusPointDto);
  }

  @Get(':id')
  async getUserBonusPointsById(@Param('id') id: number): Promise<any> {
    return await this.userBonusPointsService.getUserBonusPointsById(id);
  }
  @Get()
  async get() {
    return await this.userBonusPointsService.get();
  }

  @Put(':id')
  async updateUserBonusPoints(): Promise<any> {
    return await this.userBonusPointsService.updateUserBonusPoints();
  }
}
