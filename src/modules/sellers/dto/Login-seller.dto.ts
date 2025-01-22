import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginSellerDto {
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
}
