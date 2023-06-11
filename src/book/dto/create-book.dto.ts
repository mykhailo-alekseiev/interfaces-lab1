import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

enum Category {
  Adventure = 'adventure',
  Classic = 'classic',
  Crime = 'crime',
  Category = 'category',
}

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please select correct category' })
  readonly category: Category;

  @IsEmpty({ message: "You can't pass user id" })
  readonly user: User;
}
