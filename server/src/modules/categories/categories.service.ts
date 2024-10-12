import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, description } = createCategoryDto;
    const existedCategory = await this.categoryModel.findOne({ name }).exec();
    if (existedCategory) {
      throw new BadRequestException('Doanh mục đã tồn tại');
    }
    const newCategory = await this.categoryModel.create({
      name,
      description,
    });

    return newCategory;
  }

  async findAll() {
    const categories = await this.categoryModel.find().exec();
    return categories;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    const { name, description } = updateCategoryDto;
    const category = await this.categoryModel.findById(updateCategoryDto._id).exec();
    if (!category) {
      throw new BadRequestException('Doanh mục không tồn tại');
    }
    category.name = name;
    category.description = description;
    await category.save();
    return category;
  }

  async remove(_id: string) {
    const category = await this.categoryModel.findById(_id).exec();
    if (!category) {
      throw new BadRequestException('Doanh mục không tồn tại');
    }
    await category.deleteOne();
    return { message: 'Xóa doanh mục thành công' };
  }
}
