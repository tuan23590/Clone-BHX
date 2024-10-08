import { Module } from '@nestjs/common';
import { SupervisorsService } from './supervisors.service';
import { SupervisorsController } from './supervisors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supervisor, SupervisorSchema } from './schemas/supervisor.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Supervisor.name, schema: SupervisorSchema }]),
  ],
  controllers: [SupervisorsController],
  providers: [SupervisorsService],
})
export class SupervisorsModule {}
