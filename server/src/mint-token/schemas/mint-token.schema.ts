import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MintTokenDocument = MintToken & Document;

@Schema()
export class MintToken {
  _id: Types.ObjectId;
  @Prop()
  to: string;
  @Prop()
  from: string;
  @Prop()
  blockHash: string;
  @Prop()
  transactionHash: string;
  @Prop()
  logs: Logs[];
  @Prop()
  blockNumber: number;
  @Prop()
  status: number;
  @Prop()
  type: number;
  @Prop()
  byzantium: boolean;
}

export class Logs {
  transactionIndex?: number;
  blockNumber?: number;
  transactionHash: string;
  address: string;
  topics: string[];
  data: string;
  logIndex: number;
  blockHash: string;
}

export const MintTokenSchema = SchemaFactory.createForClass(MintToken);
