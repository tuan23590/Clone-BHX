import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternshipProgramsService } from './internship_programs.service';
import { CreateInternshipProgramDto } from './dto/create-internship_program.dto';
import { UpdateInternshipProgramDto } from './dto/update-internship_program.dto';

@Controller('internship-programs')
export class InternshipProgramsController {
  constructor(private readonly internshipProgramsService: InternshipProgramsService) {}

  @Post()
  create(@Body() createInternshipProgramDto: CreateInternshipProgramDto) {
    return this.internshipProgramsService.create(createInternshipProgramDto);
  }

  @Get()
  findAll() {
    return this.internshipProgramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internshipProgramsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternshipProgramDto: UpdateInternshipProgramDto) {
    return this.internshipProgramsService.update(+id, updateInternshipProgramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internshipProgramsService.remove(+id);
  }
}
