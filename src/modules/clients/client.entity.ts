import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('clients')
export class Client {
  @ApiProperty({ example: 1, description: 'ID-ul clientului' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John', description: 'Prenumele clientului' })
  @Column({ name: 'first_name', length: 20 })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Numele clientului' })
  @Column({ name: 'last_name', length: 20 })
  lastName: string;

  @ApiProperty({ example: '+37379834303', description: 'Numarul de telefon' })
  @Column({ name: 'phone_number', length: 20 })
  phoneNumber: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}
