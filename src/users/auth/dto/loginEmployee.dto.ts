import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginEmployeeDto {
  email: string;

  @IsNotEmpty()
  password: string;
}
