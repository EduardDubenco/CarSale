import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../cars/car.entity';
import { CarBrand } from '../car-brands/car-brand.entity';

@Entity('car_models')
export class CarModel {
  @ApiProperty({ example: 1, description: 'ID-ul modelului' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Model S', description: 'Numele modelului' })
  @Column({ length: 50 })
  name: string;

  @ApiProperty({ example: 1, description: 'ID-ul brandului' })
  @Column()
  brandId: number;

  @ManyToOne(() => CarBrand, (brand) => brand.models)
  @JoinColumn({ name: 'brandId' })
  brand: CarBrand;

  @OneToMany(() => Car, (car) => car.carModel)
  cars: Car[];
}
