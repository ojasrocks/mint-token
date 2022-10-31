import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MintTokenController } from './mint-token.controller';
import { MintTokenService } from './mint-token.service';
import { MintTokenSchema, MintToken } from './schemas/mint-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MintToken.name, schema: MintTokenSchema },
    ]),
  ],
  controllers: [MintTokenController],
  providers: [MintTokenService],
})
export class MintTokenModule {}
