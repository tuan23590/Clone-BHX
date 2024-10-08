import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternshipSchedulesService } from './internship_schedules.service';
import { CreateInternshipScheduleDto } from './dto/create-internship_schedule.dto';
import { UpdateInternshipScheduleDto } from './dto/update-internship_schedule.dto';

@Controller('internship-schedules')
export class InternshipSchedulesController {
  constructor(private readonly internshipSchedulesService: InternshipSchedulesService) {}

  @Post()
  create(@Body() createInternshipScheduleDto: CreateInternshipScheduleDto) {
    return this.internshipSchedulesService.create(createInternshipScheduleDto);
  }

  @Get()
  findAll() {
    return this.internshipSchedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internshipSchedulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternshipScheduleDto: UpdateInternshipScheduleDto) {
    return this.internshipSchedulesService.update(+id, updateInternshipScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internshipSchedulesService.remove(+id);
  }
}
