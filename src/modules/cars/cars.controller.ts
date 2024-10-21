import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'Obțineți toate mașinile' })
  @ApiResponse({
    status: 200,
    description: 'Lista de mașini',
    type: [Car],
  })
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obțineți o mașină după ID' })
  @ApiResponse({ status: 200, description: 'Detalii mașină', type: Car })
  findOne(@Param('id') id: number): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creați o nouă mașină' })
  @ApiResponse({ status: 201, description: 'Mașină creată', type: Car })
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Ștergeți o mașină după ID' })
  @ApiResponse({ status: 200, description: 'Mașină ștearsă' })
  remove(@Param('id') id: number): Promise<void> {
    return this.carsService.remove(id);
  }
}
