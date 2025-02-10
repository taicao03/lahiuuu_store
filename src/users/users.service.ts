import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(filter?: any): Promise<User[]> {
    const query: any = {};

    if (filter.name) {
      query.name = { $regex: filter.name, $options: 'i' };
    }
    return this.userModel.find(filter).exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  // async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   const user = await this.userModel
  //     .findByIdAndUpdate(id, updateUserDto, { new: true })
  //     .exec();
  //   if (!user) {
  //     throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
  //   }
  //   return user;
  // }

  async create(userDto: CreateUserDto) {
    userDto.password = await bcrypt.hash(userDto.password, 10);

    // check exists
    const userInDb = await this.userRepository.findByCondition({
      name: userDto.name,
    });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.create(userDto);
  }

  async update(filter, update) {
    if (update.refreshToken) {
      update.refreshToken = await bcrypt.hash(
        this.reverse(update.refreshToken),
        10,
      );
    }
    return await this.userRepository.findByConditionAndUpdate(filter, update);
  }

  async findByLogin({ name, password }: LoginUserDto) {
    const user = await this.userRepository.findByCondition({
      name: name,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = bcrypt.compareSync(password, user?.password);

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findByEmail(name) {
    return await this.userRepository.findByCondition({
      name: name,
    });
  }

  async getUserByRefresh(refresh_token, name) {
    const user = await this.findByEmail(name);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const is_equal = await bcrypt.compare(
      this.reverse(refresh_token),
      user?.refreshToken,
    );

    if (!is_equal) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  private reverse(s) {
    return s.split('').reverse().join('');
  }
}
