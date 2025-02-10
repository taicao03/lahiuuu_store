// src/auth/auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  // async register(createUser: CreateUserDto): Promise<User> {
  //   const existingUser = await this.userModel.findOne({
  //     name: createUser.name,
  //   });
  //   if (existingUser) {
  //     throw new HttpException('User already exists', HttpStatus.CONFLICT);
  //   }

  //   const hashedPassword = await bcrypt.hash(createUser?.password, 10);

  //   const newUser = new this.userModel({
  //     ...createUser,
  //     password: hashedPassword,
  //   });

  //   return newUser.save();
  // }

  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const token = await this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async handleVerifyToken(token) {
    try {
      const payload = this.jwtService.verify(token);
      return payload['email'];
    } catch (e) {
      throw new HttpException(
        {
          key: '',
          data: {},
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
  private async _createToken(
    { name },
    isSecondFactorAuthenticated = false,
    refresh = true,
  ) {
    const accessToken = this.jwtService.sign({
      name,
      isSecondFactorAuthenticated,
    });
    if (refresh) {
      const refreshToken = this.jwtService.sign(
        { name },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_EXPIRESIN_REFRESH,
        },
      );
      await this.userService.update(
        { name: name },
        {
          refreshToken: refreshToken,
        },
      );

      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
        refreshToken,
        expiresInRefresh: process.env.JWT_EXPIRESIN_REFRESH,
      };
    } else {
      return {
        expiresIn: process.env.EXPIRESIN,
        accessToken,
      };
    }
  }

  async refresh(refresh_token) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.SECRETKEY_REFRESH,
      });
      const user = await this.userService.getUserByRefresh(
        refresh_token,
        payload.name,
      );
      const token = await this._createToken(user, true, false);
      return {
        name: user.name,
        ...token,
      };
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByLogin(loginUserDto);
    const token = await this._createToken(user);

    return {
      ...token,
    };
  }
}
