import { Allow } from 'class-validator';

export class CreateDeskDto {
  @Allow()
  name: string;

  @Allow()
  icon: string;

  @Allow()
  rank: number;

  @Allow()
  color: string;

  @Allow()
  rankName: string;

  @Allow()
  symbol: string;
}
