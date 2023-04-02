import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.paymentTransacationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTransacationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentTransacationDto: UpdatePaymentTransacationDto) {
    return this.paymentTransacationService.update(+id, updatePaymentTransacationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentTransacationService.remove(+id);
  }
}
