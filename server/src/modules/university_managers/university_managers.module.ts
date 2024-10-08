import { Module } from '@nestjs/common';
import { UniversityManagersService } from './university_managers.service';
import { UniversityManagersController } from './university_managers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversityManager, UniversityManagerSchema } from './schemas/university_manager.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UniversityManager.name, schema: UniversityManagerSchema }]),
  ],
  controllers: [UniversityManagersController],
  providers: [UniversityManagersService],
})
export class UniversityManagersModule {}
