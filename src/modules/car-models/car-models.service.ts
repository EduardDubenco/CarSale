import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarModel } from './car-model.entity';

@Injectable()
export class CarModelsService {
  constructor(
    @InjectRepository(CarModel)
    private modelsRepository: Repository<CarModel>,
  ) {}

  findAll(): Promise<CarModel[]> {
    return this.modelsRepository.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<CarModel> {
    const model = await this.modelsRepository.findOne({
      where: { id },
      relations: ['brand'],
    });
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    return model;
  }

  create(createModelDto: { name: string; brandId: number }): Promise<CarModel> {
    const model = this.modelsRepository.create(createModelDto);
    return this.modelsRepository.save(model);
  }

  async update(
    id: number,
    updateModelDto: { name?: string; brandId?: number },
  ): Promise<CarModel> {
    const model = await this.findOne(id);
    this.modelsRepository.merge(model, updateModelDto);
    return this.modelsRepository.save(model);
  }

  async remove(id: number): Promise<void> {
    const result = await this.modelsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
  }
}
