import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { Model } from 'mongoose';
import { SubCategory } from './schemas/sub-category.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { FilesService } from '@/files/files.service';
import { ConfigService } from '@nestjs/config';
import { CategoriesService } from '../categories/categories.service';
import { Product } from '../products/schemas/product.schemas';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategory.name)
    private subCategoryModel: Model<SubCategory>,
    private filesService: FilesService,
    private configService: ConfigService,
    private categoriesService: CategoriesService,
  ) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const { name, description, image, parentCategory } = createSubCategoryDto;

    // kiểm tra danh mục con có tồn tại không
    const existedSubCategory = await this.subCategoryModel
      .findOne({ name })
      .exec();
    if (existedSubCategory) {
      throw new BadRequestException('Danh mục con đã tồn tại');
    }

    // kiểm tra danh mục cha có tồn tại không
    const existedParentCategory = await this.categoriesService.findOne(
      String(parentCategory),
    );
    if (!existedParentCategory) {
      throw new BadRequestException('Danh mục cha không tồn tại');
    }

    // tạo danh mục con mới
    const subCategory = new this.subCategoryModel({
      name,
      description,
      image,
      parentCategory,
    });
    await subCategory.save();

    await this.categoriesService.updateSubCategories(
      parentCategory,
      String(subCategory._id),
    );

    return subCategory;
  }

  async findAll() {
    const subCategories = await this.subCategoryModel
      .find()
      .populate<{ products: Product[] }>('products')
      .exec();
  
    // Shuffle the array
    const shuffled = subCategories.sort(() => 0.5 - Math.random());
  
    // Return the first 12 items from the shuffled array
    return shuffled.slice(0, 12);
  }
  

  async findOne(_id: string) {
    const subCategory = await this.subCategoryModel
      .findById(_id)
      .select('-parentCategory')
      .populate<{ products: Product[] }>('products')
      .exec();
    if (!subCategory) {
      throw new BadRequestException('Không tìm thấy danh mục con');
    }

    //const fileDomain = this.configService.get<string>('FILE_DOMAIN');
    // subCategory.products.forEach((product) => {
    //   product.variations.forEach((variation) => {
    //     variation.image = `${fileDomain}/${variation.image}`;
    //     variation.listImage.forEach((image, index) => {
    //       variation.listImage[index] = `${fileDomain}/${image}`;
    //     });
    //   });
    // });
    return subCategory;
  }

  async update(updateSubCategoryDto: UpdateSubCategoryDto) {
    const { _id, name, description, image, products } = updateSubCategoryDto;

    // kiểm tra danh mục con có tồn tại không
    const subCategory = await this.subCategoryModel.findById(_id).exec();
    if (!subCategory) {
      throw new BadRequestException('Không tìm thấy danh mục con');
    }

    // nếu có ảnh thì xóa ảnh cũ
    if (image) await this.filesService.remove(subCategory.image);

    // cập nhật thông tin danh mục con
    subCategory.name = name;
    subCategory.description = description;
    subCategory.image = image;
    await subCategory.save();
    return subCategory;
  }

  async remove(_id: string) {
    // kiểm tra danh mục con có tồn tại không
    const subCategory = await this.subCategoryModel.findById(_id).exec();
    if (!subCategory) {
      throw new BadRequestException('Không tìm thấy danh mục con');
    }

    // xóa ảnh và danh mục con
    await this.filesService.remove(subCategory.image);
    await subCategory.deleteOne();

    // xóa danh mục con trong danh mục cha
    await this.categoriesService.removeSubCategories(
      String(subCategory.parentCategory),
      _id,
    );

    return { message: 'Xóa danh mục con thành công' };
  }

  async updateProducts(_id: string, product: string) {
    const subCategory = await this.subCategoryModel.findById(_id).exec();
    if (!subCategory) {
      throw new BadRequestException('Không tìm thấy danh mục con');
    }

    subCategory.products.push(product);
    await subCategory.save();
    return subCategory;
  }

  async removeProducts(_id: string, product: string) {
    const subCategory = await this.subCategoryModel.findById(_id).exec();
    if (!subCategory) {
      throw new BadRequestException('Không tìm thấy danh mục con');
    }

    subCategory.products = subCategory.products.filter(
      (item) => item.toString() !== product,
    );
    await subCategory.save();
    return subCategory;
  }
}
