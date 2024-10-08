import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProduct: CreateProductDto) {
    return this.productService.create(createProduct);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProduct: UpdateProductDto) {
    return this.productService.update(id, updateProduct);
  }
}
