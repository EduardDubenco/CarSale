import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CarModel } from '../car-models/car-model.entity';

@Entity('car_brands')
export class CarBrand {
  @ApiProperty({ example: 1, description: 'ID-ul brandului' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Tesla', description: 'Numele brandului' })
  @Column({ length: 50, unique: true })
  name: string;

  @OneToMany(() => CarModel, (model) => model.brand)
  models: CarModel[];
}
