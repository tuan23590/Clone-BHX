import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UniversityManagerDocument = HydratedDocument<UniversityManager>;

@Schema({ timestamps: true })
export class UniversityManager {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  department: string;

  @Prop()
  supervisedStudents: string[];
}

export const UniversityManagerSchema =
  SchemaFactory.createForClass(UniversityManager);

// {
//     "_id": ObjectId("..."),
//     "managerId": "UM001",
//     "name": "Pham Thi D",
//     "email": "phamthid@university.edu",
//     "phone": "0901234567",
//     "department": "Công nghệ thông tin",
//     "supervisedStudents": [
//       ObjectId("..."),  // Reference to Students
//       ObjectId("...")
//     ]
//   }
