import { IsNotEmpty, IsNumber } from 'class-validator';

export class SignupGuest {
  @IsNotEmpty()
  phone_number: string;
}
