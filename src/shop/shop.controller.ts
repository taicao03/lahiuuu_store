import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  async create(@Body() CreateShop: CreateShopDto) {
    return this.shopService.create(CreateShop);
  }

  // @Put(':id')
  // updateShop(@Param('id') id: string, @Body() UpdateShopDto: UpdateShopDto) {
  //   return {
  //     id,
  //     ...UpdateShopDto,
  //   };
  // }

  @Get()
  getShop() {
    return this.shopService.getAll();
  }

  // @Get(':id')
  // getOneShop(@Param('id') id: string) {
  //   try {
  //     return this.shopService.getShop(+id);
  //   } catch (error) {
  //     throw new NotFoundException();
  //   }
  // }
}
