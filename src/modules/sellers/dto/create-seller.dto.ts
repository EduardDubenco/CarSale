import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
