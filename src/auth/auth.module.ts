import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/repositories/user.repository';
dotenv.config();

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    UsersService,
    UserRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
