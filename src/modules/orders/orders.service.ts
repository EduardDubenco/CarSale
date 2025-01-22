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
import { AccessoriesService } from '../accesories/accessories.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private clientsService: ClientsService,
    private carsService: CarsService,
    private accessoriesService: AccessoriesService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({
      relations: ['client', 'car', 'accessories'],
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['client', 'car', 'accessories'],
    });

    if (!order) {
      throw new NotFoundException(`Comanda cu ID-ul ${id} nu a fost gasită`);
    }

    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const client = await this.clientsService.findOrCreateByDetails(
      createOrderDto.client,
    );

    const car = await this.carsService.findOne(createOrderDto.carId);
    if (!car) {
      throw new NotFoundException(
        `Masina cu ID-ul ${createOrderDto.carId} nu a fost gasita`,
      );
    }
    if (car.isSold) {
      throw new BadRequestException(
        `Masina cu ID-ul ${createOrderDto.carId} este deja vanduta`,
      );
    }

    const accessories = await this.accessoriesService.findByIds(
      createOrderDto.accessoryIds,
    );
    if (accessories.length !== createOrderDto.accessoryIds.length) {
      throw new NotFoundException('Unele accesorii nu au fost gasite');
    }

    const accessoriesPrice = accessories.reduce(
      (sum, acc) => sum + Number(acc.price),
      0,
    );

    const order = this.ordersRepository.create({
      ...createOrderDto,
      clientId: client.id,
      client,
      car,
      accessories,
      accessoriesPrice,
      totalPrice: Number(createOrderDto.totalPrice) + accessoriesPrice,
    });

    await this.carsService.update(car.id, { isSold: true });

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    if (!order) {
      throw new NotFoundException(`Comanda cu ID-ul ${id} nu a fost gasita`);
    }

    await this.carsService.update(order.carId, { isSold: false });
    await this.ordersRepository.delete(id);
  }
}
