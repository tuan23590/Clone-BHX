// {
//     "_id": ObjectId("..."),
//     "supplierName": "ST25 Rice Co. Ltd.",
//     "address": "456 ABC Street, Binh Thanh District, Ho Chi Minh City",
//     "phoneNumber": "0281234567",
//     "email": "contact@st25rice.com",
//     "productsSupplied": [
//       ObjectId("product_id_1"),
//       ObjectId("product_id_2")
//     ]
//   }

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema({ timestamps: true })
export class Supplier {

  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  productsSupplied: string[];
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);