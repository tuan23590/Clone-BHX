import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InternshipScheduleDocument = HydratedDocument<InternshipSchedule>;

@Schema({ timestamps: true })
export class InternshipSchedule {
  @Prop()
  studentId: string;

  @Prop()
  companyId: string;

  @Prop()
  supervisorId: string;

  @Prop({ type: Object })
  schedule: {
    date: Date;
    task: string;
  }[];
}

export const InternshipScheduleSchema =
  SchemaFactory.createForClass(InternshipSchedule);

// {
//     "_id": ObjectId("..."),
//     "studentId": ObjectId("..."),
//     "companyId": ObjectId("..."),
//     "supervisorId": ObjectId("..."),
//     "schedule": [
//       {
//         "date": ISODate("2024-05-01T09:00:00Z"),
//         "task": "Học việc và làm quen với hệ thống"
//       },
//       {
//         "date": ISODate("2024-05-02T09:00:00Z"),
//         "task": "Thực hành lập trình cơ bản"
//       }
//     ]
//   }
