import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { Public } from '@/decorator/public';

@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Public()
  @Post()
  create(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return this.shoppingCartService.create(createShoppingCartDto);
  }

  @Get()
  findAll() {
    return this.shoppingCartService.findAll();
  }

  @Public()
  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.shoppingCartService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.update(+id, updateShoppingCartDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.shoppingCartService.remove(_id);
  }
}
