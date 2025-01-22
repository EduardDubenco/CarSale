import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
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
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column()
  clientId: number;

  @ApiProperty({ description: 'Referință la mașina comandată' })
  @OneToOne(() => Car)
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column()
  carId: number;

  @ApiProperty({
    example: 'pending',
    description: 'Statusul comenzii',
    enum: ['pending', 'completed', 'cancelled'],
  })
  @Column({
    default: 'pending',
    enum: ['pending', 'completed', 'cancelled'],
  })
  orderStatus: string;

  @ApiProperty({
    example: 50000.0,
    description: 'Prețul total al comenzii',
  })
  @Column('decimal', { precision: 10, scale: 2 })
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
