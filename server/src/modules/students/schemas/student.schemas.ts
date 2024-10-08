import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;
@Schema({ timestamps: true })
export class Student {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  university: string;

  @Prop()
  major: string;

  @Prop()
  year: number;

  @Prop({ type: Object })
  internship: {
    companyId: string;
    startDate: Date;
    endDate: Date;
    supervisorId: string;
    status: string;
    feedback: string;
    finalGrade: number;
  };
}

export const StudentSchema = SchemaFactory.createForClass(Student);
// {
//     "_id": ObjectId("..."),
//     "name": "Nguyen Van A",
//     "email": "nguyenvana@example.com",
//     "phone": "0123456789",
//     "university": "Đại học Bách Khoa",
//     "major": "Công nghệ thông tin",
//     "year": 3,
//     "internship": {
//       "companyId": ObjectId("..."),
//       "startDate": ISODate("2024-05-01T00:00:00Z"),
//       "endDate": ISODate("2024-08-01T00:00:00Z"),
//       "supervisorId": ObjectId("..."),
//       "status": "In Progress",
//       "feedback": "Tích cực",
//       "finalGrade": null
//     }
//   }
