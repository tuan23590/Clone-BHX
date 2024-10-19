import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema({ timestamps: true })
export class SubCategory {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  products: string[];
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);