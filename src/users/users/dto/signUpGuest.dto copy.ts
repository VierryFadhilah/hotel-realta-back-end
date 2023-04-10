import { IsNotEmpty, IsNumber } from 'class-validator';

export class SignupGuest {
  @IsNotEmpty()
  @IsNumber()
  phone_number: string;
}
