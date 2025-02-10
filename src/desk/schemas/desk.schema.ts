import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeskDocument = HydratedDocument<Desk>;
@Schema()
export class Desk {
  @Prop()
  name: string;

  @Prop()
  icon: string;

  @Prop({ type: Number })
  rank: number;

  @Prop()
  color: string;

  @Prop()
  rankName: string;

  @Prop()
  symbol: string;
}
export const DeskSchema = SchemaFactory.createForClass(Desk);
