import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentTransacationService } from './payment_transacation.service';
import { CreatePaymentTransacationDto } from './dto/create-payment_transacation.dto';
import { UpdatePaymentTransacationDto } from './dto/update-payment_transacation.dto';

@Controller('payment-transacation')
export class PaymentTransacationController {
  constructor(private readonly paymentTransacationService: PaymentTransacationService) {}

  @Post()
  create(@Body() createPaymentTransacationDto: CreatePaymentTransacationDto) {
    return this.paymentTransacationService.create(createPaymentTransacationDto);
  }

  @Post('booking')
  createBooking(@Body() createPaymentTransacationDto: CreatePaymentTransacationDto) {
    return this.paymentTransacationService.createBooking(createPaymentTransacationDto);
  }

  @Get()
  findAll( @Query('search') search: any, @Query('page') page: any, @Query('limit') limit: any, @Query('type') type: any) {
    return this.paymentTransacationService.findAll(search,page,limit,type );
  }

  @Get('topup')
  findAllTopUp( @Query('search') search: any, @Query('page') page: any, @Query('limit') limit: any) {
    return this.paymentTransacationService.findAllTopUp( search, page, limit);
  }

  
}
