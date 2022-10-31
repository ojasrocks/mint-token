import { IsNumberString, IsString } from 'class-validator';

export class AccountDTO {
  @IsString()
  address: string;
  @IsString()
  tokenName: string;
  @IsString()
  symbol: string;
  @IsNumberString()
  balance: string;
}
