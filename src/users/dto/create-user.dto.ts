import { Allow, IsNotEmpty, Max, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  // @IsNotEmpty()
  // name: string;

  // @Allow()
  // age: number;

  // @Allow()
  // phone: string;

  // @Allow()
  // address: string;

  // @Allow()
  // email: string;

  // @Allow()
  // refreshToken: string;

  // @MinLength(6)
  // @IsNotEmpty()
  // password: string;

  // @IsNotEmpty() email: string;
  @IsNotEmpty() name: string;
  @IsNotEmpty() password: string;
}

export class LoginUserDto {
  @IsNotEmpty() name: string;
  @IsNotEmpty() password: string;
}
