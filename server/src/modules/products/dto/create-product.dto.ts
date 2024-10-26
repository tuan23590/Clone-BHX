import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    category: string;
    
    @IsNotEmpty()
    supplier: number;
    
    @IsNotEmpty()
    productBio: {
        featureSpecification: string;
        productArticle: string;
        shortDescription: number;
    }

    @IsNotEmpty()
    variations: {
        _id: string;
        productCode: string;
        name: string;
        size: string;
        price: number;
        image: string;
        listImage: string;
    }[]

}
