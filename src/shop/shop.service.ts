import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
@Injectable()
export class ShopService {
  private shops = [
    {
      id: 1,
      nameStore: 'J97store',
    },
    {
      id: 2,
      nameStore: 'kkkstore',
    },
    {
      id: 3,
      nameStore: 'kkkstore',
    },
  ];

  getShops() {
    return this.shops;
  }

  getShop(id: number) {
    const shop = this.shops.find((shop) => shop.id === +id);
    if (!shop) {
      throw new Error('Shop not found');
    }
    return shop;
  }

  createShop(createShopDto: CreateShopDto) {
    const newShop = {
      ...createShopDto,
    };

    this.shops.push(newShop);

    return newShop;
  }

  updatedShop(id: number, updateShopDto: UpdateShopDto) {
    this.shops = this.shops.map((shop) => {
      if (shop.id === +id) {
        return {
          ...shop,
          ...updateShopDto,
        };
      }
      return shop;
    });

    return this.shops;
  }
}
