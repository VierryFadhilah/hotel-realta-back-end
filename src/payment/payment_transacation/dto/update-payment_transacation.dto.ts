import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentTransacationDto } from './create-payment_transacation.dto';

export class UpdatePaymentTransacationDto extends PartialType(CreatePaymentTransacationDto) {}
