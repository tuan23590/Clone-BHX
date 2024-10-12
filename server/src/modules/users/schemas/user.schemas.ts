import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ default: false })
  isActivated: boolean;

  @Prop()
  activationCode: string;

  @Prop()
  codeExpired: Date;

  @Prop({ default: 'LOCAL' })
  acountType: string;

  @Prop({ default: 'USER' })
  role: string;
  
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
