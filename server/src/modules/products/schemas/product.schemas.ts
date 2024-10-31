import { Category } from '@/modules/categories/schemas/category.schemas';
import { SubCategory } from '@/modules/sub-categories/schemas/sub-category.schemas';
import { Supplier } from '@/modules/suppliers/schemas/supplier.schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: SubCategory.name })
  category: string;

  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: Supplier.name })
  supplier: mongoose.Schema.Types.ObjectId;

  @Prop({type: Object})
  productBio: {
    featureSpecification: string;
    productArticle: string;
    shortDescription: string;
  };

  @Prop({type: [{
    _id: String,
    productCode: [String],
    name: String,
    size: String,
    price: Number,
    stockQuantity: Number,
    status: String,
    image: String,
    listImage: [String]
  }]})
  variations: {
    _id: string;
    productCode: string[];
    name: string;
    size: string;
    price: number;
    stockQuantity: number;
    status: 'active' | 'inactive';
    image: string;
    listImage: string[];
  }[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);