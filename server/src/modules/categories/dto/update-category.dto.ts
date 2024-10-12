import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {

    @IsNotEmpty( { message: '_id không được để trống' })
    @IsMongoId({ message: '_id không đúng định dạng' })
    _id: string;
}
