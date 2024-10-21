import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Obțineți toate comenzile' })
  @ApiResponse({
    status: 200,
    description: 'Lista de comenzi',
    type: [Order],
  })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obțineți o comandă după ID' })
  @ApiResponse({ status: 200, description: 'Detalii comandă', type: Order })
  findOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Creați o nouă comandă' })
  @ApiResponse({ status: 201, description: 'Comandă creată', type: Order })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Ștergeți o comandă după ID' })
  @ApiResponse({ status: 200, description: 'Comandă ștearsă' })
  remove(@Param('id') id: number): Promise<void> {
    return this.ordersService.remove(id);
  }
}
