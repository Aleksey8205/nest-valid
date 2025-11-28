import { IsString, Length } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(3, 50)
  title: string;

  @IsString()
  author: string;
}