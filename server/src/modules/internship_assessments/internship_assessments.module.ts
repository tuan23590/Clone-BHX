import { Module } from '@nestjs/common';
import { InternshipAssessmentsService } from './internship_assessments.service';
import { InternshipAssessmentsController } from './internship_assessments.controller';
import { InternshipAssessment, InternshipAssessmentSchema } from './schemas/internship_assessment.schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InternshipAssessment.name, schema: InternshipAssessmentSchema }]),
  ],
  controllers: [InternshipAssessmentsController],
  providers: [InternshipAssessmentsService],
})
export class InternshipAssessmentsModule {}
