import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schemas';
import { Model } from 'mongoose';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
    private ShoppingCartService: ShoppingCartService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const cart = await this.ShoppingCartService.findOne(createOrderDto.cartId);
    if (!cart) {
      throw new BadRequestException('Giỏ hàng không tồn tại');
    }
    // kiểm tra số điện thoại createOrderDto.shippingAddress.phone có hợp lệ không
    // đều kiện là số điện thoại việt nam
    const phone = createOrderDto.shippingAddress.phone
      .replace(/\(\+\d+\)/g, '0')
      .replaceAll(' ', '');
    const phoneRegex = /^0\d{9,10}$/;
    if (!phoneRegex.test(phone)) {
      throw new BadRequestException('Số điện thoại không hợp lệ');
    }
    const order = new this.orderModel({
      totalAmount: cart.totalAmount,
      totalPirce: cart.totalPirce,
      products: cart.products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        variationId: product.variation,
      })),
      shippingAddress: {
        ...createOrderDto.shippingAddress,
        phone,
      },
    });
    await order.save();
    await this.ShoppingCartService.remove(createOrderDto.cartId);
    return order;
  }

  async findAll(phone: string) {
    const listOrder = await this.orderModel
      .find({ 'shippingAddress.phone': phone })
      .populate('products.productId');
    if (!listOrder) {
      throw new BadRequestException('Không tìm thấy đơn hàng');
    }
    const customListOrder = listOrder.map((order) => {
      const { products, status, totalAmount, totalPirce,createdAt,_id} =
        order as any;
        console.log('order', order);
      const fillterOrder = products.map((product) => {
        const { variationId } = product;
        const { variations } = product.productId as any;
        const variation = variations.find(
          (variation) => String(variation._id) === String(variationId),
        );
        return {
          variation
        };
      });
      return {
        products: fillterOrder,
        status,
        totalPirce,
        createdAt,
        _id
      };
    });
    return customListOrder.sort((a,b)=>b.createdAt-a.createdAt);
  }

  async findOne(_id: string) {
    const order = await this.orderModel
      .findById(_id)
      .populate('products.productId');
    if (!order) {
      throw new BadRequestException('Không tìm thấy đơn hàng');
    }
    const { products, shippingAddress, status, totalAmount, totalPirce,createdAt} =
      order as any;
    const fillterOrder = products.map((product) => {
      const { quantity, variationId } = product;
      const { variations, category, _id } = product.productId as any;
      const variation = variations.find(
        (variation) => String(variation._id) === String(variationId),
      );
      return {
        quantity,
        variation,
        category,
        _id,
        sumPrice: quantity * variation.price,
      };
    });
    return {
      products: fillterOrder,
      shippingAddress,
      status,
      totalAmount,
      totalPirce,
      createdAt,
      _id: order._id,
    };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
