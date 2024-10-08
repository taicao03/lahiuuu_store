import { Allow, IsNotEmpty, Max, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @Allow()
  age: number;

  @Allow()
  phone: string;

  @Allow()
  address: string;

  @Allow()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
