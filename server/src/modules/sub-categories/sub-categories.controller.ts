import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoriesService: SubCategoriesService) {}

  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoriesService.create(createSubCategoryDto);
  }

  @Get()
  findAll() {
    return this.subCategoriesService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.subCategoriesService.findOne(_id);
  }

  @Patch()
  update(@Body() updateSubCategoryDto: UpdateSubCategoryDto) {
    return this.subCategoriesService.update(updateSubCategoryDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.subCategoriesService.remove(_id);
  }
}
