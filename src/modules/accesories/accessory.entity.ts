import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('accessories')
export class Accessory {
  @ApiProperty({
    example: 1,
    description: 'Identificatorul unic al accesoriului',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Covorase auto',
    description: 'Denumirea accesoriului',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Set premium de covorase',
    description: 'Descriere detaliata a accesoriului',
  })
  @Column()
  description: string;

  @ApiProperty({ example: 199.99, description: 'Pretul accesoriului în Lei' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ApiProperty({
    example: true,
    description: 'Indica dacă accesoriul este disponibil în stoc',
  })
  @Column({ default: true })
  isAvailable: boolean;

  @ApiProperty({
    example: 'interior',
    description: 'Categoria din care face parte accesoriul',
  })
  @Column({
    enum: ['interior', 'exterior', 'electronic', 'altele'],
    default: 'altele',
  })
  category: string;
}
