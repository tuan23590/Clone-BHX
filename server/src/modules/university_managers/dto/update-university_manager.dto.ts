import { PartialType } from '@nestjs/mapped-types';
import { CreateUniversityManagerDto } from './create-university_manager.dto';

export class UpdateUniversityManagerDto extends PartialType(CreateUniversityManagerDto) {}
