import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  age: number;
  phone: string;
  address: string;
  email: string;
  password: string;
}
