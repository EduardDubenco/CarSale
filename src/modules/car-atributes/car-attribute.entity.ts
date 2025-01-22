import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Car } from '../cars/car.entity';

@Entity('car_attributes')
export class CarAttribute {
  @ApiProperty({
    description: 'ID-ul unic al atributului',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Numele atributului',
    example: 'Culoare',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Valoarea atributului',
    example: 'Roșu',
  })
  @Column()
  value: string;

  @ApiProperty({
    description: 'Referință către mașina căreia îi aparține atributul',
    type: () => Car,
  })
  @ManyToOne(() => Car, (car) => car.attributes, { onDelete: 'CASCADE' })
  car: Car;
}
