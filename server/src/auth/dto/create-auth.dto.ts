import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {
    @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
    userName: string;
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    passWord: string;
}
