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
    description: 'Lista completă de comenzi',
    type: [Order],
  })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Găsește o comandă după ID' })
  @ApiResponse({
    status: 200,
    description: 'Detaliile comenzii căutate',
    type: Order
  })
  findOne(@Param('id') id: number): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Înregistrează o comandă nouă' })
  @ApiResponse({
    status: 201,
    description: 'Comanda a fost creată cu succes',
    type: Order
  })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Șterge o comandă după ID' })
  @ApiResponse({
    status: 200,
    description: 'Comanda a fost ștearsă cu succes'
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.ordersService.remove(id);
  }
}