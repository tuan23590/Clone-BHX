import { PartialType } from '@nestjs/mapped-types';
import { CreateInternshipAssessmentDto } from './create-internship_assessment.dto';

export class UpdateInternshipAssessmentDto extends PartialType(CreateInternshipAssessmentDto) {}
