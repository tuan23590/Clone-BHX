import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop({ type: Object })
  contactPerson: {
    name: string,
    email: string,
    phone: string
  };

  @Prop()
  industry: string;

  @Prop({ type: Object })
  internshipPositions: {
    positionId: string,
    title: string,
    description: string,
    availableSlots: number,
    requirements: string[]
  }[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);



// {
//     "_id": ObjectId("..."),
//     "companyId": "CT001",
//     "name": "ABC Software",
//     "address": "123 Đường ABC, Quận 1, TP.HCM",
//     "contactPerson": {
//       "name": "Tran Thi B",
//       "email": "tranthib@abc.com",
//       "phone": "0987654321"
//     },
//     "industry": "Software Development",
//     "internshipPositions": [
//       {
//         "positionId": "P001",
//         "title": "Intern Developer",
//         "description": "Thực tập sinh phát triển phần mềm",
//         "availableSlots": 5,
//         "requirements": [
//           "Biết Java",
//           "Có kỹ năng làm việc nhóm"
//         ]
//       }
//     ]
//   }
  
