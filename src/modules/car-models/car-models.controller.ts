import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarModelsService } from './car-models.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CarModel } from './car-model.entity';
import { CreateCarModelDto } from './dto/create-car.model.dto';

@ApiTags('Modele de masini')
@Controller('car-models')
export class CarModelsController {
  constructor(private readonly carModelsService: CarModelsService) {}

  @Get()
  @ApiOperation({ summary: 'Obtine toate modelele de masini' })
  @ApiResponse({
    status: 200,
    description: 'Lista modelelor de masini',
    type: [CarModel],
  })
  findAll(): Promise<CarModel[]> {
    return this.carModelsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtine un model dupa ID' })
  @ApiParam({ name: 'id', description: 'ID-ul modelului' })
  @ApiResponse({ status: 200, description: 'Modelul gasit', type: CarModel })
  @ApiResponse({ status: 404, description: 'Modelul nu a fost gasit' })
  findOne(@Param('id') id: number): Promise<CarModel> {
    return this.carModelsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creeaza un model nou' })
  @ApiResponse({
    status: 201,
    description: 'Modelul a fost creat',
    type: CarModel,
  })
  create(@Body() createModelDto: CreateCarModelDto): Promise<CarModel> {
    return this.carModelsService.create(createModelDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizează un model' })
  @ApiParam({ name: 'id', description: 'ID-ul modelului' })
  @ApiResponse({
    status: 200,
    description: 'Modelul a fost actualizat',
    type: CarModel,
  })
  @ApiResponse({ status: 404, description: 'Modelul nu a fost gasit' })
  update(
    @Param('id') id: number,
    @Body() updateModelDto: CreateCarModelDto,
  ): Promise<CarModel> {
    return this.carModelsService.update(id, updateModelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Sterge un model' })
  @ApiParam({ name: 'id', description: 'ID-ul modelului' })
  @ApiResponse({ status: 200, description: 'Modelul a fost sters' })
  @ApiResponse({ status: 404, description: 'Modelul nu a fost gasit' })
  remove(@Param('id') id: number): Promise<void> {
    return this.carModelsService.remove(id);
  }
}
