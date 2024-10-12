import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {

  @Prop()
  productName: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  stockQuantity: number;

  @Prop()
  supplier: string;

  @Prop()
  imageUrl: [string];

  @Prop()
  manufacturingDate: Date; // ngày sản xuất

  @Prop()
  expiryDate: Date; // ngày hết hạn
}

export const ProductSchema = SchemaFactory.createForClass(Product);