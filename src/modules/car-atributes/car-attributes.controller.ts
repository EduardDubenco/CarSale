import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CarAttributesService } from './car-attributes.service';
import { CreateCarAttributeDto } from './dto/create-car-attribute.dto';
import { CarAttribute } from './car-attribute.entity';

@ApiTags('Car Attributes')
@Controller('car-attributes')
export class CarAttributesController {
  constructor(private readonly carAttributesService: CarAttributesService) {}

  @Post()
  @ApiOperation({ summary: 'Creaza un nou attrinute' })
  @ApiResponse({
    status: 201,
    description: 'Atributul masinii a fost creat cu succes.',
    type: CarAttribute,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createCarAttributeDto: CreateCarAttributeDto) {
    return this.carAttributesService.create(createCarAttributeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Primeste toate attributele' })
  @ApiResponse({
    status: 200,
    description: 'Lista tuturor atributelor.',
    type: [CarAttribute],
  })
  findAll() {
    return this.carAttributesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Primeste un specific atribut dupa ID' })
  @ApiResponse({
    status: 200,
    description: 'Atributul solicitat.',
    type: CarAttribute,
  })
  @ApiResponse({ status: 404, description: 'Atributul negasit.' })
  findOne(@Param('id') id: number) {
    return this.carAttributesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Sterge atributul masinii dupa ID' })
  @ApiResponse({
    status: 200,
    description: 'Atributul masinii cu succes sters.',
  })
  @ApiResponse({ status: 404, description: 'Atribut negasit.' })
  remove(@Param('id') id: number) {
    return this.carAttributesService.remove(id);
  }
}
