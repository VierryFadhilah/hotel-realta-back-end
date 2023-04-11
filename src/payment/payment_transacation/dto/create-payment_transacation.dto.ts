import { IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePaymentTransacationDto {
    @IsNotEmpty()
    userID: number;		

    @IsOptional()
    orderNumber: string;

    @IsOptional()
    paymentType: string;

    @IsOptional()
    transactionType: string;
    
    @IsNotEmpty()
    amount: string;

    @IsNotEmpty()
    sourceNumber: string;

    @IsNotEmpty()
    targetNumber: string;
}
