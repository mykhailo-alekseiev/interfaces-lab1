import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../schemas/user.schema';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
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
  @IsEnum(Gender, { message: 'Gender should be man, female or other' })
  @ApiProperty({ enum: [Gender.Man, Gender.Female, Gender.Other] })
  readonly gender: Gender;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({ example: 'Jun 11 2023' })
  readonly birthdayDate: Date;
}
