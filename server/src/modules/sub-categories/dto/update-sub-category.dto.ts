import { OmitType } from '@nestjs/mapped-types';
import { CreateSubCategoryDto } from './create-sub-category.dto';
import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateSubCategoryDto extends OmitType(CreateSubCategoryDto, ['parentCategory'] as const) {

    @IsNotEmpty({ message: '_id không được để trống' })
    @IsMongoId({ message: '_id không đúng định dạng' })
    _id: ObjectId;

    @IsOptional()
    @IsArray({ message: 'Danh sách sản phẩm phải là một mảng' })
    @ArrayNotEmpty({ message: 'Danh sách sản phẩm không được rỗng' }) // Bỏ nếu không muốn kiểm tra mảng rỗng
    @IsMongoId({ each: true, message: 'Danh sách sản phẩm của danh mục con không hợp lệ' })
    products: ObjectId[];
}
