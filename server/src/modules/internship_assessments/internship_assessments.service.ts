import { Injectable } from '@nestjs/common';
import { CreateInternshipAssessmentDto } from './dto/create-internship_assessment.dto';
import { UpdateInternshipAssessmentDto } from './dto/update-internship_assessment.dto';

@Injectable()
export class InternshipAssessmentsService {
  create(createInternshipAssessmentDto: CreateInternshipAssessmentDto) {
    return 'This action adds a new internshipAssessment';
  }

  findAll() {
    return `This action returns all internshipAssessments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internshipAssessment`;
  }

  update(id: number, updateInternshipAssessmentDto: UpdateInternshipAssessmentDto) {
    return `This action updates a #${id} internshipAssessment`;
  }

  remove(id: number) {
    return `This action removes a #${id} internshipAssessment`;
  }
}
