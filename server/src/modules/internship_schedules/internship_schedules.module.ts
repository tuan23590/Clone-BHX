import { Module } from '@nestjs/common';
import { InternshipSchedulesService } from './internship_schedules.service';
import { InternshipSchedulesController } from './internship_schedules.controller';

@Module({
  controllers: [InternshipSchedulesController],
  providers: [InternshipSchedulesService],
})
export class InternshipSchedulesModule {}
