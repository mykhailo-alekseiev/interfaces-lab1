import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

enum Category {
  Adventure = 'adventure',
  Classic = 'classic',
  Crime = 'crime',
  Love = 'love',
}

export class CreateBookDto {
  @ApiProperty({ example: 'Book title' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Book description' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'Book author' })
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @ApiProperty({ example: 'Book price' })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: Category.Adventure })
  @IsNotEmpty()
  @IsEnum(Category, { message: 'please select correct category' })
  readonly category: Category;

  @IsEmpty({ message: "You can't pass user id" })
  readonly user: User;
}
