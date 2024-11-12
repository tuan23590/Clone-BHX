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
    const order = new this.orderModel({
      totalAmount: cart.totalAmount,
      totalPirce: cart.totalPirce,
      products: cart.products,
      shippingAddress: createOrderDto.shippingAddress,
    });
    await order.save();
    await this.ShoppingCartService.remove(createOrderDto.cartId);
    return order;
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(_id: string) {
    return `This action returns a #${_id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
