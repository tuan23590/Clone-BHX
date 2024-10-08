import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupervisorDocument = HydratedDocument<Supervisor>;

@Schema({ timestamps: true })
export class Supervisor {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  companyId: string;

  @Prop()
  studentsSupervised: {
    studentId: string,
    status: string
  }[];
}

export const SupervisorSchema = SchemaFactory.createForClass(Supervisor);


// {
//     "_id": ObjectId("..."),
//     "supervisorId": "SP001",
//     "name": "Le Van C",
//     "email": "levanc@abc.com",
//     "phone": "0912345678",
//     "companyId": ObjectId("..."),
//     "studentsSupervised": [
//       {
//         "studentId": ObjectId("..."),
//         "status": "In Progress"
//       }
//     ]
//   }
  