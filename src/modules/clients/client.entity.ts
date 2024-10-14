import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', length: 20 })
  firstName: string;

  @Column({ name: 'last_name', length: 20 })
  lastName: string;

  @Column({ name: 'phone_number', length: 20 })
  phoneNumber: string;
}
