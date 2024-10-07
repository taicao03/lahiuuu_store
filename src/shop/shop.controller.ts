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
  createShop(@Body() CreateShopDto: CreateShopDto) {
    return {
      nameStore: CreateShopDto.nameStore,
    };
  }

  @Put(':id')
  updateShop(@Param('id') id: string, @Body() UpdateShopDto: UpdateShopDto) {
    return {
      id,
      ...UpdateShopDto,
    };
  }

  @Get()
  getShop(@Query('name') name: string) {
    return this.shopService.getShops();
  }

  @Get(':id')
  getOneShop(@Param('id') id: string) {
    try {
      return this.shopService.getShop(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
