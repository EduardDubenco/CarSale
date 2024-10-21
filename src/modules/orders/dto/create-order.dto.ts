import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'ID-ul clientului' })
  clientId: number;

  @ApiProperty({ example: 1, description: 'ID-ul mașinii comandate' })
  carId: number;

  @ApiProperty({
    example: 'pending',
    description: 'Statusul comenzii',
  })
  orderStatus: string;

  @ApiProperty({ example: 50000.00, description: 'Prețul total al comenzii' })
  totalPrice: number;
}
