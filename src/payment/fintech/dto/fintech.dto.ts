import { IsNotEmpty, IsOptional } from 'class-validator';
export class FintechDto {

    @IsNotEmpty()
    paga_code: string;

    @IsNotEmpty()
    paga_name:string;

    @IsOptional()
    paga_modified: string;
}

