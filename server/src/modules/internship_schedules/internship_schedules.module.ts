import { Module } from '@nestjs/common';
import { InternshipSchedulesService } from './internship_schedules.service';
import { InternshipSchedulesController } from './internship_schedules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InternshipSchedule, InternshipScheduleSchema } from './schemas/internship_schedule.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InternshipSchedule.name, schema: InternshipScheduleSchema }]),
  ],
  controllers: [InternshipSchedulesController],
  providers: [InternshipSchedulesService],
})
export class InternshipSchedulesModule {}
