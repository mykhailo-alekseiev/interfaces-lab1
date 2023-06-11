import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

enum Category {
  Adventure = 'adventure',
  Classic = 'classic',
  Crime = 'crime',
  Category = 'category',
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Please select correct category' })
  readonly category: Category;

  @IsEmpty({ message: "You can't pass user id" })
  readonly user: User;
}
