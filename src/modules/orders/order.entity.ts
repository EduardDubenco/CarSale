import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../clients/client.entity';
import { Car } from '../cars/car.entity';

@Entity('orders')
export class Order {
  @ApiProperty({ example: 1, description: 'ID-ul comenzii' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Referință la clientul care a plasat comanda' })
  @ManyToOne(() => Client)
  client: Client;

  @ApiProperty({ description: 'Referință la mașina comandată' })
  @ManyToOne(() => Car)
  car: Car;

  @ApiProperty({
    example: 'pending',
    description: 'Statusul comenzii',
  })
  @Column({ default: 'pending' })
  orderStatus: string;

  @ApiProperty({
    example: 50000.00,
    description: 'Prețul total al comenzii',
  })
  @Column('decimal')
  totalPrice: number;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Data plasării comenzii',
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
