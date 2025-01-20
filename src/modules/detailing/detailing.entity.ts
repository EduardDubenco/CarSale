import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('detailing')
export class Detailing {
  @ApiProperty({ example: 1, description: 'ID-ul serviciului de detailing' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'Exterior Cleaning',
    description: 'Descrierea serviciului de detailing',
  })
  @Column('text')
  detailDescription: string;

  @ApiProperty({
    example: 'Car Mat Set',
    description: 'Descrierea accesoriilor incluse',
  })
  @Column('text')
  accessoryDescription: string;

  @ApiProperty({
    example: 150.0,
    description: 'Prețul pentru serviciile de detailing și accesorii',
  })
  @Column('decimal')
  price: number;
}
