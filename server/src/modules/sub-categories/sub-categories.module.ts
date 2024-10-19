import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from './schemas/sub-category.schemas';
import { FilesModule } from '@/files/files.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubCategory.name, schema: SubCategorySchema },
    ]),
    FilesModule,
  ],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
})
export class SubCategoriesModule {}
