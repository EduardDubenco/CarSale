import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsBoolean, IsPositive } from 'class-validator';

export class CreateAccessoryDto {
  @ApiProperty({ example: 'Covorașe auto', description: 'Denumirea accesoriului' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'Set premium de covorașe', description: 'Descriere detaliată a accesoriului' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 199.99, description: 'Prețul accesoriului în Lei' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: true, description: 'Indică disponibilitatea în stoc' })
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    example: 'interior',
    description: 'Categoria accesoriului',
    enum: ['interior', 'exterior', 'electronic']
  })
  @IsEnum(['interior', 'exterior', 'electronic'])
  category: string;
}