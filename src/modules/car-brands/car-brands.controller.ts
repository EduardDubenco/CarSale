import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarBrandsService } from './car-brands.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CarBrand } from './car-brand.entity';
import { CreateCarBrandDto } from './dto/create-car.brand.dto';

@ApiTags('Branduri de masini')
@Controller('car-brands')
export class CarBrandsController {
  constructor(private readonly carBrandsService: CarBrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtine toate brandurile de masini' })
  @ApiResponse({
    status: 200,
    description: 'Lista brandurilor de masini',
    type: [CarBrand],
  })
  findAll(): Promise<CarBrand[]> {
    return this.carBrandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtine un brand dupa ID' })
  @ApiParam({ name: 'id', description: 'ID-ul brandului' })
  @ApiResponse({ status: 200, description: 'Brandul gasit', type: CarBrand })
  @ApiResponse({ status: 404, description: 'Brandul nu a fost gasit' })
  findOne(@Param('id') id: number): Promise<CarBrand> {
    return this.carBrandsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creeaza un brand nou' })
  @ApiResponse({
    status: 201,
    description: 'Brandul a fost creat',
    type: CarBrand,
  })
  create(@Body() createBrandDto: CreateCarBrandDto): Promise<CarBrand> {
    return this.carBrandsService.create(createBrandDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizeaza un brand' })
  @ApiParam({ name: 'id', description: 'ID-ul brandului' })
  @ApiResponse({
    status: 200,
    description: 'Brandul a fost actualizat',
    type: CarBrand,
  })
  @ApiResponse({ status: 404, description: 'Brandul nu a fost gasit' })
  update(
    @Param('id') id: number,
    @Body() updateBrandDto: CreateCarBrandDto,
  ): Promise<CarBrand> {
    return this.carBrandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'sterge un brand' })
  @ApiParam({ name: 'id', description: 'ID-ul brandului' })
  @ApiResponse({ status: 200, description: 'Brandul a fost sters' })
  @ApiResponse({ status: 404, description: 'Brandul nu a fost gasit' })
  remove(@Param('id') id: number): Promise<void> {
    return this.carBrandsService.remove(id);
  }
}
