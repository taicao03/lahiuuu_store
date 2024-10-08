// src/auth/auth.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      name: createUser.name,
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(createUser?.password, 10);

    const newUser = new this.userModel({
      ...createUser,
      password: hashedPassword,
    });

    return newUser.save();
  }

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ name });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
