import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShopModule } from './shop/shop.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { DeskModule } from './desk/desk.module';
import { EventGateway } from './event.gateway';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('URI'),
      }),
      inject: [ConfigService],
    }),
    DeskModule,
    UsersModule,
    ShopModule,
    AuthModule,
    ProductModule,
    DeskModule,
  ],
  controllers: [AppController],
  providers: [EventGateway, AppService],
})
export class AppModule {}
