import { IsNotEmpty, IsOptional } from 'class-validator';

export class BankDto {

    @IsNotEmpty()
    bank_code: string;

    @IsNotEmpty()
    bank_name:string;

    @IsOptional()
    bank_modified_date: string;
}
