import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Seller } from './seller.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('seller_logins')
export class SellerLogin {
  @ApiProperty({ example: 1, description: 'ID-ul inregistrarii de logare' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'ID-ul vanzatorului' })
  @Column()
  sellerId: number;

  @ManyToOne(() => Seller, (seller) => seller.logins)
  @JoinColumn({ name: 'seller_id' })
  seller: Seller;

  @ApiProperty({
    example: '192.168.1.1',
    description: 'Adresa IP a clientului',
  })
  @Column({ name: 'ip_address', nullable: true })
  ipAddress: string;

  @ApiProperty({
    example: 'Chrome/Windows',
    description: 'User agent-ul clientului',
  })
  @Column({ name: 'user_agent', nullable: true, length: 500 })
  userAgent: string;

  @ApiProperty({ example: true, description: 'Statusul autentificarii' })
  @Column({ default: true })
  success: boolean;

  @ApiProperty({
    example: '2024-01-22T12:00:00Z',
    description: 'Data si ora logarii',
  })
  @CreateDateColumn({ name: 'logged_at' })
  loggedAt: Date;
}
