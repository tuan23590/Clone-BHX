import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
    productName: string;

    @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
    price: number;

    @IsNotEmpty({ message: 'Mô tả sản phẩm không được để trống' })
    description: string;

    @IsNotEmpty({ message: 'Danh mục sản phẩm không được để trống' })
    category: string;

    @IsMongoId({ message: 'Nhà cung cấp không hợp lệ' })
    @IsNotEmpty({ message: 'Nhà cung cấp không được để trống' })
    supplier: string;

    @IsNotEmpty({ message: 'Hình ảnh sản phẩm không được để trống' })
    image: [string];

    @IsNotEmpty({ message: 'Ngày sản xuất không được để trống' })
    manufacturingDate: Date;

    @IsNotEmpty({ message: 'Ngày hết hạn không được để trống' })
    expiryDate: Date;

}
