import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AccessoriesService } from './accessories.service';
import { Accessory } from './accessory.entity';
import { CreateAccessoryDto } from './dto/create-accesory.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Accesorii')
@Controller('accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Listeaza toate accesoriile disponibile' })
  @ApiResponse({
    status: 200,
    description: 'Lista completa de accesorii',
    type: [Accessory],
  })
  findAll(): Promise<Accessory[]> {
    return this.accessoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gaseste un accesoriu dupa ID' })
  @ApiResponse({
    status: 200,
    description: 'Detaliile accesoriului cautat',
    type: Accessory,
  })
  findOne(@Param('id') id: number): Promise<Accessory> {
    return this.accessoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Inregistreaza un accesoriu nou' })
  @ApiResponse({
    status: 201,
    description: 'Accesoriul a fost creat cu succes',
    type: Accessory,
  })
  create(@Body() createAccessoryDto: CreateAccessoryDto): Promise<Accessory> {
    return this.accessoriesService.create(createAccessoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizeaza un accesoriu existent' })
  @ApiResponse({
    status: 200,
    description: 'Accesoriul a fost actualizat cu succes',
    type: Accessory,
  })
  update(
    @Param('id') id: number,
    @Body() updateAccessoryDto: Partial<CreateAccessoryDto>,
  ): Promise<Accessory> {
    return this.accessoriesService.update(id, updateAccessoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Sterge un accesoriu' })
  @ApiResponse({
    status: 200,
    description: 'Accesoriul a fost sters cu succes',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.accessoriesService.remove(id);
  }
}
