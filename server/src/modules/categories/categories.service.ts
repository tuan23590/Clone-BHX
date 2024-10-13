import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Model } from 'mongoose';
import { Category } from './schemas/category.schemas';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,

    private configService: ConfigService
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, description,image } = createCategoryDto;
    const existedCategory = await this.categoryModel.findOne({ name }).exec();
    if (existedCategory) {
      throw new BadRequestException('Doanh mục đã tồn tại');
    }
    const newCategory = await this.categoryModel.create({
      name,
      description,
      image,
    });

    return newCategory;
  }

  async findAll(query: string, current: number, pageSize: number) {

    const { filter, sort } = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = await this.categoryModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const offset = (current - 1) * pageSize; // offset dùng để skip bao nhiêu phần tử

    const results = await this.categoryModel
    .find(filter)
    .limit(pageSize)
    .skip(offset)
    .sort(sort as any)

    results.map((category) => {
      category.image && (category.image = `${this.configService.get<string>('FILE_DOMAIN')}/${category.image}`);
    });

    return {
      meta: {
        current: current,
        pageSize: pageSize,
        pages: totalPages,
        total: totalItems,
      },
      results
    }
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
