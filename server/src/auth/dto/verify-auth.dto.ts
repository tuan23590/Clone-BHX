import {IsNotEmpty} from 'class-validator';

export class VerifyDto {
    @IsNotEmpty({ message: 'Mã xác thực không được để trống' })
    verifyCode: string;

    @IsNotEmpty({ message: '_id không được để trống' })
    _id: string;
}
