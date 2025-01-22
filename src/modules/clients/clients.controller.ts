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
  @ApiOperation({ summary: 'Obțineți toți clienții' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clienți',
    type: [Client],
  })
  findAll(): Promise<Client[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obțineți un client după ID' })
  @ApiResponse({ status: 200, description: 'Detalii client', type: Client })
  findOne(@Param('id') id: number): Promise<Client> {
    return this.clientsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creați un client nou' })
  @ApiResponse({ status: 201, description: 'Client creat', type: Client })
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientsService.create(createClientDto);
  }
}
