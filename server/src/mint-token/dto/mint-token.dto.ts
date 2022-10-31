import { IsString } from 'class-validator';
import { Logs } from '../schemas/mint-token.schema';

export class MintTokenDTO {
  @IsString()
  transactionHash: string;
}

export class Receipt {
  createdAt: Date;

  to: string;

  from: string;

  blockHash: string;

  transactionHash: string;

  logs: Logs[];

  blockNumber: number;

  status: number;

  type: number;

  byzantium: boolean;
}
