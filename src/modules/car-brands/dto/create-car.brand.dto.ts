import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCarBrandDto {
  @ApiProperty({
    example: 'Toyota',
    description: 'Numele brandului',
    minLength: 2,
    maxLength: 50
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  name: string;
}