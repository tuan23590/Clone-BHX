import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InternshipProgramDocument = HydratedDocument<InternshipProgram>;

@Schema({ timestamps: true })


export class InternshipProgram {

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  participatingCompanies: string[];

  @Prop()
  registeredStudents: string[];
}

export const InternshipProgramSchema = SchemaFactory.createForClass(InternshipProgram);

// {
//     "_id": ObjectId("..."),
//     "programId": "PR001",
//     "title": "Chương trình thực tập hè 2024",
//     "description": "Chương trình thực tập cho sinh viên CNTT.",
//     "startDate": ISODate("2024-05-01T00:00:00Z"),
//     "endDate": ISODate("2024-08-01T00:00:00Z"),
//     "participatingCompanies": [
//       ObjectId("..."),  // Reference to Companies
//       ObjectId("...")
//     ],
//     "registeredStudents": [
//       ObjectId("..."),  // Reference to Students
//       ObjectId("...")
//     ]
//   }
  