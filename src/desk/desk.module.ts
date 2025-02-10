import { Module } from '@nestjs/common';
import { DeskGateway } from './desk-gateway';
import { DeskService } from './desk.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Desk, DeskSchema } from './schemas/desk.schema';
import { DeskController } from './desk.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Desk.name, schema: DeskSchema }]),
  ],
  controllers: [DeskController],
  providers: [DeskGateway, DeskService],
  exports: [DeskGateway, DeskService],
})
export class DeskModule {}
