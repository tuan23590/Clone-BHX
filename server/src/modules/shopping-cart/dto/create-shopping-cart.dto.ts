import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, Max } from "class-validator";

export class CreateShoppingCartDto {

    @IsMongoId( {message: 'Id sản phẩm không hợp lệ'} )
    @IsNotEmpty({message: 'Mã sản phẩm không được để trống'})
    productId: string;

    @IsNumber({}, {message: 'Số lượng phải là số'} )
    @Max(100, {message: 'Số lượng không được lớn hơn 100'} )
    @IsNotEmpty({message: 'Số lượng không được để trống'})
    quantity: number;

    @IsMongoId( {message: 'Id không hợp lệ'})
    @IsOptional()
    _id: string;
}
