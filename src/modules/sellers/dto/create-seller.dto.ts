import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';

export class CreateSellerDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Numele de utilizator al vânzătorului',
  })
  @IsString()
  @IsNotEmpty()
  userName: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email-ul vânzătorului',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Parola vânzătorului' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: UserRole,
    example: UserRole.USER,
    description: 'Rolul utilizatorului',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
