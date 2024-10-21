import { IsMongoId, IsNotEmpty, IsOptional } from "class-validator";
import mongoose from "mongoose";

export class CreateSubCategoryDto {
    
    @IsNotEmpty({ message: 'Tên danh mục con không được để trống' })
    name: string;

    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    description: string;

    @IsNotEmpty({ message: 'Hình ảnh không được để trống' })
    image: string;

    @IsNotEmpty({ message: 'Danh mục cha không được để trống' })
    @IsMongoId({ message: 'Danh mục cha không hợp lệ' })
    parentCategory: string;
}
