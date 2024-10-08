import { Injectable } from '@nestjs/common';
import { CreateInternshipScheduleDto } from './dto/create-internship_schedule.dto';
import { UpdateInternshipScheduleDto } from './dto/update-internship_schedule.dto';

@Injectable()
export class InternshipSchedulesService {
  create(createInternshipScheduleDto: CreateInternshipScheduleDto) {
    return 'This action adds a new internshipSchedule';
  }

  findAll() {
    return `This action returns all internshipSchedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} internshipSchedule`;
  }

  update(id: number, updateInternshipScheduleDto: UpdateInternshipScheduleDto) {
    return `This action updates a #${id} internshipSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} internshipSchedule`;
  }
}
