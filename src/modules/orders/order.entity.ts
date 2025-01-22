import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../clients/client.entity';
import { Car } from '../cars/car.entity';
import { Accessory } from '../accesories/accessory.entity';

@Entity('orders')
export class Order {
  @ApiProperty({ example: 1, description: 'Identificatorul unic al comenzii' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Referinta catre clientul care a plasat comanda',
  })
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @Column()
  clientId: number;

  @ApiProperty({ description: 'Referinta catre masina comandata' })
  @OneToOne(() => Car)
  @JoinColumn({ name: 'carId' })
  car: Car;

  @Column()
  carId: number;

  @ApiProperty({ description: 'Lista accesoriilor incluse in comanda' })
  @ManyToMany(() => Accessory)
  @JoinTable({
    name: 'order_accessories',
    joinColumn: { name: 'orderId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'accessoryId', referencedColumnName: 'id' },
  })
  accessories: Accessory[];

  @ApiProperty({
    example: 'In asteptare',
    description: 'Starea curenta a comenzii',
    enum: ['In asteptare', 'finalizata', 'anulata'],
  })
  @Column({
    default: 'In asteptare',
    enum: ['In asteptare', 'finalizata', 'anulata'],
  })
  orderStatus: string;

  @ApiProperty({
    example: 50000.0,
    description: 'Pretul total al masinii',
  })
  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @ApiProperty({
    example: 0.0,
    description: 'Suma totala a accesoriilor comandate',
  })
  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  accessoriesPrice: number;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Data si ora inregistrarii comenzii',
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
