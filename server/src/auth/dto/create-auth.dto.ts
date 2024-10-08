import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
  
  @IsNotEmpty({ message: 'Nhập lại mật khẩu không được để trống' })
  rePassword: string;

  @IsOptional()
  name: string;
}
