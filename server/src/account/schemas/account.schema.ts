import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema()
export class Account {
  _id: Types.ObjectId;
  @Prop()
  address: string;
  @Prop()
  tokenName: string;
  @Prop()
  symbol: string;
  @Prop()
  balance: string;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
