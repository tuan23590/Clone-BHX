import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateOrderDto {

    @IsNotEmpty({message: 'Thông tin người nhận không được để trống'})
    shippingAddress: {
        name: string;
        phone: string;
        address: string;
    };

    @IsNotEmpty({message: '_id giỏ hàng không được để trống'})
    @IsMongoId({message: '_id giỏ hàng không hợp lệ'})
    cartId: string;
}
