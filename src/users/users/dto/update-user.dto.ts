import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  username: string;
  type: 'T' | 'C' | 'I';
  company: string;
  // @IsEmail()
  email: string;
  phoneNumber: string;
  photoProfile: string;
  // modifiedDate: Date;
  hotelId: number;
  nationalId: string;
  jobTitle: string;
  gender: 'M' | 'F';

  birthDate: string;
  MaritalStat: 'M' | 'S';
  roleId: any;
  userId: number;
  UroleId: any;
}
