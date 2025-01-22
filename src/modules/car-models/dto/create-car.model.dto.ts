import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateCarModelDto {
  @ApiProperty({
    example: 'Corolla',
    description: 'Numele modelului',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: 1,
    description: 'ID-ul brandului',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  brandId: number;
}
