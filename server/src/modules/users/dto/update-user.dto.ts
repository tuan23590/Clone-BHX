import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const), // OmitType dùng để loại bỏ các thuộc tính không cần thiết
) {
    @IsMongoId({ message: 'Id không hợp lệ' })
    @IsNotEmpty({ message: 'Id không được để trống' })
    _id: string;
}