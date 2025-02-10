import { CreateDeskDto } from './dto/desk.dto';
import { Desk } from './schemas/desk.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DeskService {
  constructor(@InjectModel(Desk.name) private deskModel: Model<Desk>) {}

  async createDesk(createDeskDto: CreateDeskDto): Promise<Desk> {
    const desk = await this.deskModel.create(createDeskDto);
    return desk;
  }

  async findAll(filter?: any): Promise<Desk[]> {
    const query: any = {};

    if (filter.name) {
      query.name = { $regex: filter.name, $options: 'i' };
    }

    if (filter.rank) {
      query.rank = { $eq: Number(filter.rank) };
    }

    return await this.deskModel.find(query).exec();
  }
}
