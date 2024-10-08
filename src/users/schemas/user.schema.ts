import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  id: string;

  @Prop({
    unique: true,
  })
  name: string;

  @Prop({
    default: null,
  })
  age: number;

  @Prop({
    default: '',
  })
  phone: string;

  @Prop({
    default: '',
  })
  address: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({
    default: 'USER',
  })
  role: 'ADMIN' | 'USER';

  @Prop({
    default: Date.now,
  })
  updatedDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
