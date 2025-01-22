import { ApiProperty } from '@nestjs/swagger';

export class CreateCarAttributeDto {
  @ApiProperty({
    description: 'Numele atributului',
    example: 'Culoare',
  })
  name: string;

  @ApiProperty({
    description: 'Valoarea atributului',
    example: 'Roșu',
  })
  value: string;

  @ApiProperty({
    description: 'ID-ul mașinii asociate',
    example: 1,
  })
  carId: number;
}
