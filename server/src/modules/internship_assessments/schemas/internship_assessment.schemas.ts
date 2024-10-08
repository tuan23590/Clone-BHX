import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InternshipAssessmentDocument = HydratedDocument<InternshipAssessment>;

@Schema({ timestamps: true })
export class InternshipAssessment {
  @Prop()
  studentId: string;

  @Prop()
  companyId: string;

  @Prop()
  supervisorId: string;

  @Prop()
  feedback: string;

  @Prop({ type: Object })
  performance: {
    technicalSkills: number;
    communicationSkills: number;
    teamWork: number;
    punctuality: number;
  };

  @Prop()
  finalGrade: string;

}

export const InternshipAssessmentSchema = SchemaFactory.createForClass(InternshipAssessment);

// {
//     "_id": ObjectId("..."),
//     "studentId": ObjectId("..."),
//     "companyId": ObjectId("..."),
//     "supervisorId": ObjectId("..."),
//     "feedback": "Sinh viên rất chăm chỉ và học hỏi nhanh.",
//     "performance": {
//       "technicalSkills": 4.5,
//       "communicationSkills": 4.0,
//       "teamWork": 4.8,
//       "punctuality": 4.9
//     },
//     "finalGrade": "A"
//   }
