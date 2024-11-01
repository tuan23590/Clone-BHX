import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schemas';
import { Model } from 'mongoose';
import { SubCategoriesService } from '../sub-categories/sub-categories.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
    private subCategoriesService: SubCategoriesService,
    private configService: ConfigService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { category, supplier, productBio, variations } = createProductDto;

    // find by list variations[].name and category
    const existedProduct = await this.productModel.findOne({
      category,
      'variations.name': { $in: variations.map((variation) => variation.name) },
    });
    if (existedProduct) {
      throw new BadRequestException('Sản phẩm đã tồn tại');
    }

    const newProduct = await this.productModel.create({
      category,
      supplier,
      productBio,
      variations,
    });

    await this.subCategoriesService.updateProducts(
      category,
      String(newProduct._id),
    );
    return newProduct;
  }

  async findAll() {
    const products = await this.productModel
      .find()
      .populate({
        path: 'category',
        select: '-products -createdAt -updatedAt -__v',
      })
      .populate({
        path: 'supplier',
        select: '-productsSupplied -createdAt -updatedAt -__v',
      })
      .exec();
    const fileDomain = this.configService.get<string>('FILE_DOMAIN');
    products.forEach((product) => {
      product.variations.forEach((variation, index) => {
        product.variations[index].image = `${fileDomain}/${variation.image}`;
        product.variations[index].listImage.forEach((image, index2) => {
          product.variations[index].listImage[index2] =
            `${fileDomain}/${image}`;
        });
      });
    });
    return products;
  }

  async findOne(_id: string) {
    // find in list variations[]._id
    const product = await this.productModel.findOne({ 'variations._id': _id });
    if (!product) {
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }
    const fileDomain = this.configService.get<string>('FILE_DOMAIN');
    product.variations.forEach((variation, index) => {
      product.variations[index].image = `${fileDomain}/${variation.image}`;
      product.variations[index].listImage.forEach((image, index2) => {
        product.variations[index].listImage[index2] = `${fileDomain}/${image}`;
      });
    });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
