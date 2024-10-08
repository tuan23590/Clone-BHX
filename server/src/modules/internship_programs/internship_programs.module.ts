import { Module } from '@nestjs/common';
import { InternshipProgramsService } from './internship_programs.service';
import { InternshipProgramsController } from './internship_programs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InternshipProgram, InternshipProgramSchema } from './schemas/internship_program.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InternshipProgram.name, schema: InternshipProgramSchema }]),
  ],
  controllers: [InternshipProgramsController],
  providers: [InternshipProgramsService],
})
export class InternshipProgramsModule {}
