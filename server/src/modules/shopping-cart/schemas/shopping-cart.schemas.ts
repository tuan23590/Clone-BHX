import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShoppingCartDocument = HydratedDocument<ShoppingCart>;

@Schema({ timestamps: true })
export class ShoppingCart {

  @Prop()
  customer: string;

  @Prop({ type: [{ product: String, quantity: Number }] })
  products: [
    {
      product: string,
      quantity: number
    }
  ];

  @Prop()
  totalAmount: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);