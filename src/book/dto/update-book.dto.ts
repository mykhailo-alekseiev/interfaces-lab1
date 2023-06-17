import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

enum Category {
  Adventure = 'adventure',
  Classic = 'classic',
  Crime = 'crime',
  Love = 'love',
}

export class UpdateBookDto extends PartialType(CreateBookDto) {
  @ApiProperty({ example: 'Book title' })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({ example: 'Book description' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'Book author' })
  @IsOptional()
  @IsString()
  readonly author: string;

  @ApiProperty({ example: 'Book price' })
  @IsOptional()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ example: Category.Adventure })
  @IsOptional()
  @IsEnum(Category, { message: 'please select correct category' })
  readonly category: Category;

  @IsEmpty({ message: "You can't pass user id" })
  readonly user: User;
}
