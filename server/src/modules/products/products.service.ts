import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schemas';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const {
      productName,
      price,
      description,
      category,
      supplier,
      image,
      manufacturingDate,
      expiryDate,
    } = createProductDto;

    // find by productName and category
    const existedProduct = await this.productModel
      .findOne({ productName, category })
      .exec();

    if (existedProduct) {
      throw new BadRequestException('Sản phẩm đã tồn tại');
    }

    const newProduct = await this.productModel.create({
      productName,
      price,
      description,
      category,
      supplier,
      image,
      manufacturingDate,
      expiryDate,
    });

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
    return products;
  }

  async findOne(_id: string) {
    const product = await this.productModel.findById(_id).exec();
    if (!product) {
      throw new BadRequestException('Không tìm thấy sản phẩm');
    }
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
