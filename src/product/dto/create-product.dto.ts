import {
  Allow,
  IsArray,
  IsEnum,
  IsNumber,
  IsObject,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { StatusProduct } from '../enum/product.enum';
import { Type } from 'class-transformer';

export class VariantsProductDto {
  @IsNumber()
  quality: number;

  @IsArray()
  colors: string[];
}

export class SalesProductDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  value: number;

  @Allow()
  priceSale: number;
}

export class CreateProductDto {
  @Allow()
  nameProduct: string;

  @Allow()
  price: number;

  @IsEnum(StatusProduct)
  readonly status: StatusProduct;

  @IsObject()
  @ValidateNested()
  @Type(() => VariantsProductDto)
  variants: VariantsProductDto;

  @IsObject()
  @ValidateNested()
  @Type(() => SalesProductDto)
  sales: SalesProductDto;
}
