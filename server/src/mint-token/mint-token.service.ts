import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Receipt } from './dto/mint-token.dto';
import { MintToken, MintTokenDocument } from './schemas/mint-token.schema';

@Injectable()
export class MintTokenService {
  constructor(
    @InjectModel(MintToken.name)
    private readonly mintToken: Model<MintTokenDocument>,
  ) {}

  private readonly logger = new Logger(MintTokenService.name);

  async addMintEvent(data: Receipt) {
    const response = await this.mintToken.updateOne(
      { transactionHash: data.transactionHash },
      data,
      {
        upsert: true,
      },
    );
    this.logger.log(`Updated/Added Minting Tx: ${data.transactionHash}`);
    return response.acknowledged;
  }
}
