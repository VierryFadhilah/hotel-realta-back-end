import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SignupEmployee {
  username: string;
  user_type: '1' | '2' | '3' | '4' | '5';
  @IsEmail()
  email: string;

  @IsPhoneNumber('ID')
  phone_number: string;

  user_photo_profile: string;
  uspa_user_id: number;
  uspa_passwordhash?: string;
  uspa_passwordsalt?: string;
  confirm_password?: string;
  password: string;
}
