import { Category } from '@/modules/categories/schemas/category.schemas';
import { Supplier } from '@/modules/suppliers/schemas/supplier.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {

  @Prop()
  productName: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: mongoose.Schema.Types.ObjectId;

  @Prop()
  stockQuantity: number;

  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: Supplier.name })
  supplier: mongoose.Schema.Types.ObjectId;

  @Prop()
  image: [string];

  @Prop()
  manufacturingDate: Date; // ngày sản xuất

  @Prop()
  expiryDate: Date; // ngày hết hạn

  @Prop()
  status: 'active' | 'inactive';
}

export const ProductSchema = SchemaFactory.createForClass(Product);