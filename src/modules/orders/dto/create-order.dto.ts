import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsPositive,
  ValidateNested,
  IsArray,
  ArrayMinSize
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClientDto } from '../../clients/dto/create-client.dto';

export class CreateOrderDto {
  @ApiProperty({
    type: () => CreateClientDto,
    description: 'Datele clientului care plasează comanda'
  })
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: CreateClientDto;

  @ApiProperty({
    example: 1,
    description: 'Identificatorul unic al mașinii selectate pentru comandă'
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  carId: number;

  @ApiProperty({
    example: 'în așteptare',
    description: 'Starea comenzii',
    enum: ['în așteptare', 'finalizată', 'anulată']
  })
  @IsNotEmpty()
  @IsEnum(['în așteptare', 'finalizată', 'anulată'])
  orderStatus: string;

  @ApiProperty({
    example: 50000.00,
    description: 'Prețul de bază al comenzii, fără accesorii'
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Lista de identificatori pentru accesoriile selectate',
    type: [Number],
    isArray: true
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(0)
  accessoryIds: number[];
}