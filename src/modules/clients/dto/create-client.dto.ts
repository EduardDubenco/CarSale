import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ example: 'John', description: 'Prenumele clientului' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Numele clientului' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: '+37379834303', description: 'Numarul de telefon' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?[0-9]{10,}$/, {
    message: 'Numarul de telefon trebuie sa contină cel putin 10 cifre',
  })
  phoneNumber: string;
}
