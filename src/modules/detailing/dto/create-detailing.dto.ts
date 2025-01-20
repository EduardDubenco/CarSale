import { ApiProperty } from '@nestjs/swagger';

export class CreateDetailingDto {
  @ApiProperty({
    example: 'Exterior Cleaning',
    description: 'Descrierea serviciului de detailing',
  })
  detailDescription: string;

  @ApiProperty({
    example: 'Car Mat Set',
    description: 'Descrierea accesoriilor incluse',
  })
  accessoryDescription: string;

  @ApiProperty({
    example: 150.0,
    description: 'Prețul pentru serviciile de detailing și accesorii',
  })
  price: number;
}
