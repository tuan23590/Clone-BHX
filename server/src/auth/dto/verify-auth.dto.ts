import {IsNotEmpty} from 'class-validator';

export class VerifyDto {
    @IsNotEmpty({ message: 'Mã xác thực không được để trống' })
    verifyCode: string;

    @IsNotEmpty({ message: '_id không được để trống' })
    _id: string;
}

export class ResendCodeDto {
    @IsNotEmpty({ message: 'Email không được để trống' })
    email: string;
}

export class ForgotPasswordDto {
    @IsNotEmpty({ message: '_id không được để trống' })
    _id: string;

    @IsNotEmpty({ message: 'Mã xác thực không được để trống' })
    verifyCode: string;

    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    password: string;

    @IsNotEmpty({ message: 'Nhập lại mật khẩu không được để trống' })
    confirmPassword: string;
}
