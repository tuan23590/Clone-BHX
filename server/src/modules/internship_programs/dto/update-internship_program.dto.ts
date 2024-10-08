import { PartialType } from '@nestjs/mapped-types';
import { CreateInternshipProgramDto } from './create-internship_program.dto';

export class UpdateInternshipProgramDto extends PartialType(CreateInternshipProgramDto) {}
