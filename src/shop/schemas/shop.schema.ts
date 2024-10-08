import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  nameStore: string;

  @Prop()
  listProduct: string;

  @Prop(
    raw({
      sizes: { type: String, default: '' },
      colors: { type: [String], default: [] },
    }),
  )
  productDetails: Record<string, any>;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop()
  images: string;

  @Prop({
    default: Date.now,
  })
  updatedDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
