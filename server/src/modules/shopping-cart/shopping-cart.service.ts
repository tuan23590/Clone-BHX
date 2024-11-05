import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { ShoppingCart } from './schemas/shopping-cart.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectModel(ShoppingCart.name)
    private shoppingCartModel: Model<ShoppingCart>,
    private configService: ConfigService,
  ) {}

  async create(createShoppingCartDto: CreateShoppingCartDto) {
    const { _id, productId, quantity, variationId } = createShoppingCartDto;
    const shoppingCart = await this.shoppingCartModel.findById(_id);
    if (shoppingCart) {
      let productExists = false;
      shoppingCart.products.forEach((product) => {
        if (
          String(product.productId) === productId &&
          String(product.variationId) === variationId
        ) {
          product.quantity = Number(product.quantity) + Number(quantity);
          productExists = true;
        }
      });
      if (!productExists) {
        shoppingCart.products.push({
          productId,
          quantity: Number(quantity),
          variationId,
        });
      }

      // Loại bỏ các sản phẩm có quantity <= 0
      shoppingCart.products = shoppingCart.products.filter(
        (product) => product.quantity > 0,
      ) as any;

      // Tính lại tổng số lượng
      shoppingCart.totalAmount = shoppingCart.products.reduce(
        (acc, product) => acc + product.quantity,
        0,
      );

      return shoppingCart.save();
    } else {
      return this.shoppingCartModel.create({
        products: [{ productId, quantity: Number(quantity), variationId }],
        totalAmount: Number(quantity),
      });
    }
  }

  findAll() {
    return `This action returns all shoppingCart`;
  }

  async findOne(_id: string) {
    const cart = await this.shoppingCartModel
      .findById(_id)
      .populate('products.productId')
      .exec();
    if (!cart) {
      throw new BadRequestException('Không tìm thấy giỏ hàng');
    }
    // const fileDomain = this.configService.get('FILE_DOMAIN');
    const fillterCart = cart.products.map((product) => {
      const { productId, quantity, variationId } = product;
      const { _id, productBio, variations,category } = productId as any;
      let variation = variations.find(
        (variation) => String(variation._id) === String(variationId),
      );
      variation.productCode = null;
      // variation.image = `${fileDomain}/${variation.image}`;
      // variation.listImage = variation.listImage.map(
      //   (image) => `${fileDomain}/${image}`,
      // );
      const total = quantity * variation.price;
      return { _id,category, productBio, variation, total, quantity };
    });
    const totalPirce = fillterCart.reduce(
      (acc, product) => acc + product.total,
      0,
    );
    return { totalAmount: cart.totalAmount, totalPirce, products: fillterCart };
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
