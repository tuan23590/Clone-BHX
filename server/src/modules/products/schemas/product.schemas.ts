import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type productDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @Prop()
    name: string;
    
    @Prop()
    price: number;
    
    @Prop()
    description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);