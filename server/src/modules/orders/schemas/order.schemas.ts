import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop()
    user: string;

    @Prop()
    products: { productId: string; quantity: number }[];

    @Prop()
    total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);