import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAccountsService } from './user_accounts.service';
import { UserAccountDto } from './dto/user_account.dto';


@Controller('user-accounts')
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountsService) {}

  @Post()
  create(@Body() userAccountDto: UserAccountDto) {
    return this.userAccountsService.create(userAccountDto);
  }

  @Get()
  findAll() {
    return this.userAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAccountsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() userAccountDto: UserAccountDto) {
    return this.userAccountsService.update(+id, userAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAccountsService.remove(+id);
  }
}
