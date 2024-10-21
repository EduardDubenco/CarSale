import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DetailingService } from './detailing.service';
import { Detailing } from './detailing.entity';
import { CreateDetailingDto } from './dto/create-detailing.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('detailing')
@Controller('detailing')
export class DetailingController {
  constructor(private readonly detailingService: DetailingService) {}

  @Get()
  @ApiOperation({ summary: 'Obțineți toate serviciile de detailing' })
  @ApiResponse({
    status: 200,
    description: 'Lista de servicii de detailing',
    type: [Detailing],
  })
  findAll(): Promise<Detailing[]> {
    return this.detailingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obțineți un serviciu de detailing după ID' })
  @ApiResponse({ status: 200, description: 'Detalii serviciu detailing', type: Detailing })
  findOne(@Param('id') id: number): Promise<Detailing> {
    return this.detailingService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creați un nou serviciu de detailing' })
  @ApiResponse({ status: 201, description: 'Serviciu de detailing creat', type: Detailing })
  create(@Body() createDetailingDto: CreateDetailingDto): Promise<Detailing> {
    return this.detailingService.create(createDetailingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Ștergeți un serviciu de detailing după ID' })
  @ApiResponse({ status: 200, description: 'Serviciu de detailing șters' })
  remove(@Param('id') id: number): Promise<void> {
    return this.detailingService.remove(id);
  }
}
