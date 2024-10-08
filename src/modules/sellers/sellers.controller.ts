import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { Seller } from './seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('sellers')
@Controller('sellers')
export class SellersController {
    constructor(private readonly sellersService: SellersService) {}

    @Get()
    @ApiOperation({ summary: 'Obțineți toți vânzătorii' })
    @ApiResponse({ status: 200, description: 'Lista de vânzători', type: [Seller] })
    findAll(): Promise<Seller[]> {
        return this.sellersService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obțineți un vânzător după ID' })
    @ApiResponse({ status: 200, description: 'Detalii vânzător', type: Seller })
    findOne(@Param('id') id: number): Promise<Seller> {
        return this.sellersService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Creați un nou vânzător' })
    @ApiResponse({ status: 201, description: 'Vânzător creat', type: Seller })
    create(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
        return this.sellersService.create(createSellerDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Ștergeți un vânzător după ID' })
    @ApiResponse({ status: 200, description: 'Vânzător șters' })
    remove(@Param('id') id: number): Promise<void> {
        return this.sellersService.remove(id);
    }
}
