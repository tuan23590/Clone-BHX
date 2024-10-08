import { Module } from '@nestjs/common';
import { InternshipAssessmentsService } from './internship_assessments.service';
import { InternshipAssessmentsController } from './internship_assessments.controller';

@Module({
  controllers: [InternshipAssessmentsController],
  providers: [InternshipAssessmentsService],
})
export class InternshipAssessmentsModule {}
