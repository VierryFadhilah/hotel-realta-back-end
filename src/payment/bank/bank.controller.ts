import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankDto } from './dto/bank.dto';


@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  create(@Body() bankDto: BankDto) {
    return this.bankService.create(bankDto);
  }

  @Get()
  findAll( @Query('search') search: any):Promise<any> {
    return this.bankService.findAll(search);
  }

  @Get(':id')
  findById(@Param('id') id: string){
    return this.bankService.findById(+id)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() bankDto: BankDto) {
    return this.bankService.update(id, bankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bankService.remove(+id);
  }
}
