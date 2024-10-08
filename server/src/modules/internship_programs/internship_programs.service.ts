import { Injectable } from '@nestjs/common';
import { CreateInternshipProgramDto } from './dto/create-internship_program.dto';
import { UpdateInternshipProgramDto } from './dto/update-internship_program.dto';

@Injectable()
export class InternshipProgramsService {
  create(createInternshipProgramDto: CreateInternshipProgramDto) {
    return 'This action adds a new internshipProgram';
  }

  findAll() {
    return `This action returns all internshipPrograms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internshipProgram`;
  }

  update(id: number, updateInternshipProgramDto: UpdateInternshipProgramDto) {
    return `This action updates a #${id} internshipProgram`;
  }

  remove(id: number) {
    return `This action removes a #${id} internshipProgram`;
  }
}
