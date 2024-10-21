import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ example: 'Model S', description: 'Modelul mașinii' })
  model: string;

  @ApiProperty({ example: 'Tesla', description: 'Marca mașinii' })
  brand: string;

  @ApiProperty({ example: 2020, description: 'Anul de fabricație' })
  year: number;

  @ApiProperty({ example: 10000, description: 'Kilometrajul mașinii' })
  mileage: number;

  @ApiProperty({ example: 'Black', description: 'Culoarea mașinii' })
  color: string;

  @ApiProperty({ example: 50000.00, description: 'Prețul mașinii' })
  price: number;

  @ApiProperty({ example: 'A perfect electric car.', description: 'Descrierea mașinii' })
  description: string;

  @ApiProperty({ example: 'url-to-image', description: 'URL-ul imaginii mașinii', required: false })
  imageUrl?: string;
}
