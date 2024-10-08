import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniversityManagersService } from './university_managers.service';
import { CreateUniversityManagerDto } from './dto/create-university_manager.dto';
import { UpdateUniversityManagerDto } from './dto/update-university_manager.dto';

@Controller('university-managers')
export class UniversityManagersController {
  constructor(private readonly universityManagersService: UniversityManagersService) {}

  @Post()
  create(@Body() createUniversityManagerDto: CreateUniversityManagerDto) {
    return this.universityManagersService.create(createUniversityManagerDto);
  }

  @Get()
  findAll() {
    return this.universityManagersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.universityManagersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUniversityManagerDto: UpdateUniversityManagerDto) {
    return this.universityManagersService.update(+id, updateUniversityManagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.universityManagersService.remove(+id);
  }
}
