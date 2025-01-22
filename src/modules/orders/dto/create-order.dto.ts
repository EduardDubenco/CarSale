import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClientDto } from '../../clients/dto/create-client.dto';

export class CreateOrderDto {
  @ApiProperty({ type: () => CreateClientDto })
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: CreateClientDto;

  @ApiProperty({ example: 1, description: 'ID-ul mașinii comandate' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  carId: number;

  @ApiProperty({
    example: 'pending',
    description: 'Statusul comenzii',
    enum: ['pending', 'completed', 'cancelled'],
  })
  @IsNotEmpty()
  @IsEnum(['pending', 'completed', 'cancelled'])
  orderStatus: string;

  @ApiProperty({ example: 50000.0, description: 'Prețul total al comenzii' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalPrice: number;
}
