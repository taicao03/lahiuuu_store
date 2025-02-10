import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { CreateDeskDto } from './dto/desk.dto';
import { DeskService } from './desk.service';
@Controller('desk')
export class DeskController {
  constructor(private readonly deskService: DeskService) {}
  @Post('createCard')
  async create(@Body() createDeskDto: CreateDeskDto) {
    return await this.deskService.createDesk(createDeskDto);
  }
  @Get()
  async findAll(@Query() query: any) {
    return await this.deskService.findAll(query);
  }
}
