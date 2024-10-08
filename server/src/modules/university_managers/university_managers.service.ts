import { Injectable } from '@nestjs/common';
import { CreateUniversityManagerDto } from './dto/create-university_manager.dto';
import { UpdateUniversityManagerDto } from './dto/update-university_manager.dto';

@Injectable()
export class UniversityManagersService {
  create(createUniversityManagerDto: CreateUniversityManagerDto) {
    return 'This action adds a new universityManager';
  }

  findAll() {
    return `This action returns all universityManagers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} universityManager`;
  }

  update(id: number, updateUniversityManagerDto: UpdateUniversityManagerDto) {
    return `This action updates a #${id} universityManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} universityManager`;
  }
}
