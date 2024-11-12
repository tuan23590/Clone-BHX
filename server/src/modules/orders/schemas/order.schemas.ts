import { Product } from '@/modules/products/schemas/product.schemas';
import { User } from '@/modules/users/schemas/user.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: User.name})
  customer: string;

  @Prop({default: new Date()})
  orderDate: Date;

  @Prop()
  totalAmount: number;

  @Prop()
  totalPirce: number;

  @Prop({
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: Product.name },
        quantity: { type: Number, required: true },
        variationId: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
  })
  products: [
    {
      productId: string;
      quantity: number;
      variationId: string;
    },
  ];

  //"Pending", "Shipping", "Delivered", "Cancelled"
  @Prop({ default: 'Pending' }) 
  status: 'Pending' | 'Shipping' | 'Delivered' | 'Cancelled';

  @Prop({type: {
    name: String,
    phone: String,
    address: String
  }})
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };

  @Prop({default: 'COD'})
  paymentMethod: 'COD' | 'Bank Transfer' | 'Credit Card';
}

export const OrderSchema = SchemaFactory.createForClass(Order);