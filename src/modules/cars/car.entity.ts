import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('cars')
export class Car {
  @ApiProperty({ example: 1, description: 'ID-ul mașinii' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Model S', description: 'Modelul mașinii' })
  @Column()
  model: string;

  @ApiProperty({ example: 'Tesla', description: 'Marca mașinii' })
  @Column()
  brand: string;

  @ApiProperty({ example: 2020, description: 'Anul de fabricație' })
  @Column()
  year: number;

  @ApiProperty({ example: 10000, description: 'Kilometrajul mașinii' })
  @Column()
  mileage: number;

  @ApiProperty({ example: 'Black', description: 'Culoarea mașinii' })
  @Column()
  color: string;

  @ApiProperty({ example: 50000.00, description: 'Prețul mașinii' })
  @Column('decimal')
  price: number;

  @ApiProperty({ example: 'A perfect electric car.', description: 'Descrierea mașinii' })
  @Column('text')
  description: string;

  @ApiProperty({ example: 'url-to-image', description: 'URL-ul imaginii mașinii' })
  @Column({ nullable: true })
  imageUrl?: string;
}
