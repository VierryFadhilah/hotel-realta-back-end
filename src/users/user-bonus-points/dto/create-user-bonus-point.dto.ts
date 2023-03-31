import { IsNotEmpty } from 'class-validator';

export class CreateUserBonusPointDto {
  @IsNotEmpty()
  ubpo_id: number;
  @IsNotEmpty()
  PointUserid: number;
  @IsNotEmpty()
  totalPoints: number;
  @IsNotEmpty()
  bonusType: string;
  createdOn: Date;
}
