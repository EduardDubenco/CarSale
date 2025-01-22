import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comenzi')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Listează toate comenzile' })
  @ApiResponse({
    status: 200,
    description: 'Lista completa de comenzi',
    type: [Order],
  })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Gaseste o comanda dupa ID' })
  @ApiResponse({
    status: 200,
    description: 'Detaliile comenzii cautate',
    type: Order,
  })
  findOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Inregistreaza o comandă noua' })
  @ApiResponse({
    status: 201,
    description: 'Comanda a fost stearsa cu succes',
    type: Order,
  })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Sterge o comanda dupa ID' })
  @ApiResponse({
    status: 200,
    description: 'Comanda a fost stearsa cu succes',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.ordersService.remove(id);
  }
}
