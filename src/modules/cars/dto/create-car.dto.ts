import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min, IsPositive } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 1, description: 'ID-ul modelului mașinii' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  carModelId: number;

  @ApiProperty({ example: 2020, description: 'Anul de fabricație' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1900)
  year: number;

  @ApiProperty({ example: 10000, description: 'Kilometrajul mașinii' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  mileage: number;

  @ApiProperty({ example: 50000.0, description: 'Prețul mașinii' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'Mașină în stare perfectă',
    description: 'Descrierea mașinii',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}