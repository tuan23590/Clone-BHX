import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'SubCategory' })
  subCategories: string[];

  @Prop()
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);