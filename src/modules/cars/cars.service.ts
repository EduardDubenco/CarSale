import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './car.entity';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  findAll(): Promise<Car[]> {
    return this.carsRepository.find({
      relations: ['carModel', 'carModel.brand', 'order'],
    });
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carsRepository.findOne({
      where: { id },
      relations: ['carModel', 'carModel.brand', 'order'],
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found`);
    }

    return car;
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carsRepository.create(createCarDto);
    return this.carsRepository.save(car);
  }

  async update(id: number, updateCarDto: Partial<CreateCarDto>): Promise<Car> {
    const car = await this.findOne(id);
    this.carsRepository.merge(car, updateCarDto);
    return this.carsRepository.save(car);
  }

  async remove(id: number): Promise<void> {
    const car = await this.findOne(id);
    if (car.isSold) {
      throw new BadRequestException(
        `Cannot delete car with ID ${id} because it is sold`,
      );
    }
    await this.carsRepository.delete(id);
  }
}
