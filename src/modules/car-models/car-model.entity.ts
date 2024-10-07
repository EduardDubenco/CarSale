import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    MODERATOR = 'moderator',
}

@Entity('sellers')
export class Seller {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 255 })
    user_name: string;

    @Column({ length: 72 })
    password_hash: string;

    @Column({ type: 'char', length: 16 })
    salt: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ unique: true, length: 255 })
    email: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;
}
