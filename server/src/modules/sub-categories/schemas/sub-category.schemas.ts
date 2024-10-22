import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
  products: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parentCategory: string;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);