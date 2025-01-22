import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { SellerLogin } from './seller-login.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('sellers')
export class Seller {
  @ApiProperty({ example: 1, description: 'ID-ul vanzatorului' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'john_doe',
    description: 'Numele de utilizator al vanzatorului',
  })
  @Column({ name: 'user_name', unique: true })
  userName: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'Hash-ul parolei vanzatorului',
  })
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @ApiProperty({
    example: 'salt1234567890',
    description: 'Salt-ul utilizat pentru hash-ul parolei',
  })
  @Column({ length: 64 })
  salt: string;

  @ApiProperty({
    example: '2024-01-01T00:00:00Z',
    description: 'Data crearii contului',
  })
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email-ul vanzatorului',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Rolul utilizatorului',
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => SellerLogin, (login) => login.seller)
  logins: SellerLogin[];
}
