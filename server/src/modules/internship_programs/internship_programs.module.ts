import { Module } from '@nestjs/common';
import { InternshipProgramsService } from './internship_programs.service';
import { InternshipProgramsController } from './internship_programs.controller';

@Module({
  controllers: [InternshipProgramsController],
  providers: [InternshipProgramsService],
})
export class InternshipProgramsModule {}
