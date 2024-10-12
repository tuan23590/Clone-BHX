import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {

  @Prop()
  orderCode: string;

  @Prop()
  customer: string;

  @Prop()
  orderDate: Date;

  @Prop()
  totalAmount: number;

  @Prop({ type: [{ product: String, quantity: Number, price: Number }] })
  products: [
    {
      product: string,
      quantity: number,
      price: number
    }
  ];

  //"Pending", "Shipping", "Delivered", "Cancelled"
  @Prop({ default: 'Pending' }) 
  status: 'Pending' | 'Shipping' | 'Delivered' | 'Cancelled';

  @Prop()
  shippingAddress: string;

  @Prop() //"COD", "Bank Transfer", "Credit Card"
  paymentMethod: 'COD' | 'Bank Transfer' | 'Credit Card';
}

export const OrderSchema = SchemaFactory.createForClass(Order);