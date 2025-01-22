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

  @ApiProperty({ example: '+40721234567', description: 'Numărul de telefon' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\+?[0-9]{10,}$/, {
    message: 'Numărul de telefon trebuie să conțină cel puțin 10 cifre',
  })
  phoneNumber: string;
}
