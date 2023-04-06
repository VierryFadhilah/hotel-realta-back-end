import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';
export class CreateUserPasswordDto {
  currentPassword: string;
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(8, 100)
  Password: string;
  retypePass: string;
}
