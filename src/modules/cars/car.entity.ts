import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CarModel } from '../car-models/car-model.entity';

@Entity('cars')
export class Car {
  @ApiProperty({ example: 1, description: 'ID-ul mașinii' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID-ul modelului mașinii' })
  @Column()
  carModelId: number;

  @ManyToOne(() => CarModel, (carModel) => carModel.cars)
  @JoinColumn({ name: 'carModelId' })
  carModel: CarModel;

  @ApiProperty({ example: 2020, description: 'Anul fabricației' })
  @Column('int')
  year: number;

  @ApiProperty({ example: 15000, description: 'Chilometrajul automobilului' })
  @Column('int')
  mileage: number;

  @ApiProperty({ example: 15000, description: 'Prețul mașinii în euro' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    example: 'Mașina în stare perfectă, fără accidente.',
    description: 'Descrierea mașinii',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    example: '2025-01-20T12:34:56Z',
    description: 'Data adăugării în baza de date',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
