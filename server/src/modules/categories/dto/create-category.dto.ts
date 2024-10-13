import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'Hình ảnh không được để trống' })
  image: string;
}
