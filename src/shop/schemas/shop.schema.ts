import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

export type ShopDocument = HydratedDocument<Shop>;

@Schema()
export class Shop {
  @Prop({
    unique: true,
  })
  nameStore: string;

  @Prop()
  listProduct: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  images: string;

  @Prop({
    default: Date.now,
  })
  updatedDate: Date;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
