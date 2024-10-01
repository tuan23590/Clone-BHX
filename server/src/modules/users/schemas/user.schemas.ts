import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  married: boolean;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop()
  activationCode: string;

  @Prop({ default: 'LOCAL' })
  acountType: string;

  @Prop({ default: 'USER' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);