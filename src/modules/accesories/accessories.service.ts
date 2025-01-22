import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accessory } from './accessory.entity';
import { CreateAccessoryDto } from './dto/create-accesory.dto';

@Injectable()
export class AccessoriesService {
  constructor(
    @InjectRepository(Accessory)
    private accessoriesRepository: Repository<Accessory>,
  ) {}

  async findAll(): Promise<Accessory[]> {
    return this.accessoriesRepository.find();
  }

  async findOne(id: number): Promise<Accessory> {
    const accessory = await this.accessoriesRepository.findOne({
      where: { id },
    });
    if (!accessory) {
      throw new NotFoundException(`Accesoriul cu ID-ul ${id} nu a fost gasit`);
    }
    return accessory;
  }

  async create(createAccessoryDto: CreateAccessoryDto): Promise<Accessory> {
    const accessory = this.accessoriesRepository.create(createAccessoryDto);
    return this.accessoriesRepository.save(accessory);
  }

  async findByIds(ids: number[]): Promise<Accessory[]> {
    return this.accessoriesRepository.findByIds(ids);
  }

  async update(
    id: number,
    updateAccessoryDto: Partial<CreateAccessoryDto>,
  ): Promise<Accessory> {
    const accessory = await this.findOne(id);
    const updatedAccessory = Object.assign(accessory, updateAccessoryDto);
    return this.accessoriesRepository.save(updatedAccessory);
  }

  async remove(id: number): Promise<void> {
    const accessory = await this.findOne(id);
    await this.accessoriesRepository.remove(accessory);
  }
}
