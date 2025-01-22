import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarAttribute } from './car-attribute.entity';

@Injectable()
export class CarAttributesService {
  constructor(
    @InjectRepository(CarAttribute)
    private carAttributeRepository: Repository<CarAttribute>,
  ) {}

  async create(data: Partial<CarAttribute>): Promise<CarAttribute> {
    const newAttribute = this.carAttributeRepository.create(data);
    return this.carAttributeRepository.save(newAttribute);
  }

  async findAll(): Promise<CarAttribute[]> {
    return this.carAttributeRepository.find();
  }

  async findOne(id: number): Promise<CarAttribute> {
    const attribute = await this.carAttributeRepository.findOne({
      where: { id },
    });
    if (!attribute) {
      throw new Error(`Attribute cu ID ${id} ne gasit`);
    }
    return attribute;
  }

  async remove(id: number): Promise<void> {
    const result = await this.carAttributeRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Attribute cu ID ${id} ne gasit`);
    }
  }
}
