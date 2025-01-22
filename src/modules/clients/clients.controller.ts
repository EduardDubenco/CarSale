import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtineti toti clientii' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clienti',
    type: [Client],
  })
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtineti un client dupa ID' })
  @ApiResponse({ status: 200, description: 'Detalii client', type: Client })
  findOne(@Param('id') id: number): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creati un client nou' })
  @ApiResponse({ status: 201, description: 'Client creat', type: Client })
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }
}
