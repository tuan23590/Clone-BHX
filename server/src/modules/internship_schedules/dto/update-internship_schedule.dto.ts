import { PartialType } from '@nestjs/mapped-types';
import { CreateInternshipScheduleDto } from './create-internship_schedule.dto';

export class UpdateInternshipScheduleDto extends PartialType(CreateInternshipScheduleDto) {}
