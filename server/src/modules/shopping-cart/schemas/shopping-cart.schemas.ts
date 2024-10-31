import { Product } from '@/modules/products/schemas/product.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ShoppingCartDocument = HydratedDocument<ShoppingCart>;

@Schema({ timestamps: true })
export class ShoppingCart {
  @Prop()
  customer: string;

  @Prop({
    type: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: Product.name },
        quantity: { type: Number, required: true },
      },
    ],
  })
  products: [
    {
      productId: string;
      quantity: number;
    },
  ];

  @Prop()
  totalAmount: number;
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
