import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sex } from '../schemas/user.schema';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'please enter correct email' })
  @ApiProperty({ example: 'email@gmail.ua' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Michael' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'qwerty123' })
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(Sex, { message: 'sex should be male or female' })
  @ApiProperty({ enum: [Sex.Male, Sex.Female] })
  readonly sex: Sex;
}
