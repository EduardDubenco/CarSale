import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Car } from './car.entity';

@ApiTags('Masini')
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtine toate masinile' })
  @ApiResponse({
    status: 200,
    description: 'Lista masinilor',
    type: [Car]
  })
  findAll(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtine o masina dupa ID' })
  @ApiParam({ name: 'id', description: 'ID-ul masinii' })
  @ApiResponse({ status: 200, description: 'Masina gasita', type: Car })
  @ApiResponse({ status: 404, description: 'Masina nu a fost gasita' })
  findOne(@Param('id') id: number): Promise<Car> {
    return this.carsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Adauga o masina noua' })
  @ApiResponse({
    status: 201,
    description: 'Masina a fost adaugata',
    type: Car
  })
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizeaza o masina' })
  @ApiParam({ name: 'id', description: 'ID-ul masinii' })
  @ApiResponse({ status: 200, description: 'Masina a fost actualizata', type: Car })
  @ApiResponse({ status: 404, description: 'Masina nu a fost gasita' })
  update(
    @Param('id') id: number,
    @Body() updateCarDto: Partial<CreateCarDto>,
  ): Promise<Car> {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'sterge o masina' })
  @ApiParam({ name: 'id', description: 'ID-ul masinii' })
  @ApiResponse({ status: 200, description: 'Masina a fost stearsa' })
  @ApiResponse({ status: 404, description: 'Masina nu a fost gasita' })
  remove(@Param('id') id: number): Promise<void> {
    return this.carsService.remove(id);
  }
}