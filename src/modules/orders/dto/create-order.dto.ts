import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsPositive,
  ValidateNested,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateClientDto } from '../../clients/dto/create-client.dto';

export class CreateOrderDto {
  @ApiProperty({
    type: () => CreateClientDto,
    description: 'Datele clientului care plaseaza comanda',
  })
  @ValidateNested()
  @Type(() => CreateClientDto)
  client: CreateClientDto;

  @ApiProperty({
    example: 1,
    description: 'Identificatorul unic al mașinii selectate pentru comanda',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  carId: number;

  @ApiProperty({
    example: 'in asteptare',
    description: 'Starea comenzii',
    enum: ['in asteptare', 'finalizata', 'anulata'],
  })
  @IsNotEmpty()
  @IsEnum(['in asteptare', 'finalizata', 'anulata'])
  orderStatus: string;

  @ApiProperty({
    example: 50000.0,
    description: 'Pretul de baza al comenzii, fara accesorii',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Lista de identificatori pentru accesoriile selectate',
    type: [Number],
    isArray: true,
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(0)
  accessoryIds: number[];
}
