import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums/user-role.enum';

export class CreateSellerDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Numele de utilizator al vanzatorului',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email-ul vanzatorului',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Parola vanzatorului' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: UserRole,
    description: 'Rolul vanzatorului',
    example: UserRole.USER,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
