import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<ShopDocument>) {}
  // getShops() {
  //   return this.shops;
  // }

  // getShop(id: number) {
  //   const shop = this.shops.find((shop) => shop.id === +id);
  //   if (!shop) {
  //     throw new Error('Shop not found');
  //   }
  //   return shop;
  // }

  getAll() {
    return this.shopModel.find();
  }

  async create(createShop: CreateShopDto) {
    const existingShop = await this.shopModel.findOne({
      nameStore: createShop.nameStore,
    });

    if (existingShop) {
      throw new HttpException(
        'Shop with this name already exists',
        HttpStatus.CONFLICT,
      );
    }
    const newShop = new this.shopModel(createShop);

    return newShop.save();
  }

  // updatedShop(id: number, updateShopDto: UpdateShopDto) {
  //   this.shops = this.shops.map((shop) => {
  //     if (shop.id === +id) {
  //       return {
  //         ...shop,
  //         ...updateShopDto,
  //       };
  //     }
  //     return shop;
  //   });

  //   return this.shops;
  // }
}
