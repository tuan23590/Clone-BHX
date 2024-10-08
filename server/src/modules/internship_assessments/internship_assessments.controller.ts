import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternshipAssessmentsService } from './internship_assessments.service';
import { CreateInternshipAssessmentDto } from './dto/create-internship_assessment.dto';
import { UpdateInternshipAssessmentDto } from './dto/update-internship_assessment.dto';

@Controller('internship-assessments')
export class InternshipAssessmentsController {
  constructor(private readonly internshipAssessmentsService: InternshipAssessmentsService) {}

  @Post()
  create(@Body() createInternshipAssessmentDto: CreateInternshipAssessmentDto) {
    return this.internshipAssessmentsService.create(createInternshipAssessmentDto);
  }

  @Get()
  findAll() {
    return this.internshipAssessmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internshipAssessmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternshipAssessmentDto: UpdateInternshipAssessmentDto) {
    return this.internshipAssessmentsService.update(+id, updateInternshipAssessmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internshipAssessmentsService.remove(+id);
  }
}
