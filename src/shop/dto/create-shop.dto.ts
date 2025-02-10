import { IsNotEmpty } from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  nameStore: string;
}
