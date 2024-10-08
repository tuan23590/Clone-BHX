import { Module } from '@nestjs/common';
import { UniversityManagersService } from './university_managers.service';
import { UniversityManagersController } from './university_managers.controller';

@Module({
  controllers: [UniversityManagersController],
  providers: [UniversityManagersService],
})
export class UniversityManagersModule {}
