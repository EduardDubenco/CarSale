import { Controller, Get, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('sellers')
@Controller('sellers')
export class ClientsController {
  constructor(private readonly sellersService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'Obțineți toți vânzătorii' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vânzători',
    type: [Client],
  })
  findAll(): Promise<Client[]> {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obțineți un vânzător după ID' })
  @ApiResponse({ status: 200, description: 'Detalii vânzător', type: Client })
  findOne(@Param('id') id: number): Promise<Client> {
    return this.sellersService.findOne(id);
  }
}
