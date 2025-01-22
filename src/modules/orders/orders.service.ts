import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientsService } from '../clients/clients.service';
import { CarsService } from '../cars/cars.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private clientsService: ClientsService,
    private carsService: CarsService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['client', 'car'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['client', 'car'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Găsim sau creăm clientul
    const client = await this.clientsService.findOrCreateByDetails(
      createOrderDto.client,
    );

    // Verificăm dacă mașina există și nu este vândută
    const car = await this.carsService.findOne(createOrderDto.carId);
    if (!car) {
      throw new NotFoundException(
        `Car with ID ${createOrderDto.carId} not found`,
      );
    }
    if (car.isSold) {
      throw new BadRequestException(
        `Car with ID ${createOrderDto.carId} is already sold`,
      );
    }

    // Creăm comanda
    const order = this.ordersRepository.create({
      ...createOrderDto,
      clientId: client.id,
      client,
      car,
    });

    // Marchăm mașina ca fiind vândută
    await this.carsService.update(car.id, { isSold: true });

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Eliberează mașina pentru a putea fi vândută din nou
    await this.carsService.update(order.carId, { isSold: false });

    await this.ordersRepository.delete(id);
  }
}
