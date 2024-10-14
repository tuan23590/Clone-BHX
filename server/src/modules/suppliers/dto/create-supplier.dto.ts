import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateSupplierDto {

    @IsNotEmpty({ message: 'Tên nhà cung cấp không được để trống' })
    name: string;
    
    @IsNotEmpty({ message: 'Địa chỉ nhà cung cấp không được để trống' })
    address: string;
    
    @IsPhoneNumber('VN', { message: 'Số điện thoại nhà cung cấp không hợp lệ' })
    @IsNotEmpty({ message: 'Số điện thoại nhà cung cấp không được để trống' })
    phone: string;
    
    @IsEmail({}, { message: 'Email nhà cung cấp không hợp lệ' })
    @IsNotEmpty({ message: 'Email nhà cung cấp không được để trống' })
    email: string;
    
    productsSupplied: string[];
}
