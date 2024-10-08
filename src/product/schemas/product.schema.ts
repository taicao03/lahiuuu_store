import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { StatusProduct } from '../enum/product.enum';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  nameProduct: string;

  @Prop()
  price: number;

  @Prop({ default: 0 })
  status: StatusProduct;

  // Product Details
  @Prop(
    raw({
      sizes: { type: String, default: '' },
      colors: { type: [String], default: [] },
    }),
  )
  productDetails: Record<string, any>;

  // Sales
  @Prop(
    raw({
      value: { type: Number, default: 0 },
      priceSale: { type: Number, default: 0 },
    }),
  )
  sales: Record<string, any>;

  @Prop({ default: '' })
  images: string;

  //variants
  @Prop(
    raw({
      quality: { type: Number, default: 0 },
      colors: { type: [String], default: [] },
    }),
  )
  variants: Record<string, any>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
