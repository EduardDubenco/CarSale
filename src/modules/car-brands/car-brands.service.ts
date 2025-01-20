import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarBrand } from './car-brand.entity';

@Injectable()
export class CarBrandsService {
  constructor(
    @InjectRepository(CarBrand)
    private brandsRepository: Repository<CarBrand>,
  ) {}

  findAll(): Promise<CarBrand[]> {
    return this.brandsRepository.find();
  }

  async findOne(id: number): Promise<CarBrand> {
    const brand = await this.brandsRepository.findOne({
      where: { id },
      relations: ['models'],
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  create(createBrandDto: { name: string }): Promise<CarBrand> {
    const brand = this.brandsRepository.create(createBrandDto);
    return this.brandsRepository.save(brand);
  }

  async update(
    id: number,
    updateBrandDto: { name: string },
  ): Promise<CarBrand> {
    const brand = await this.findOne(id);
    this.brandsRepository.merge(brand, updateBrandDto);
    return this.brandsRepository.save(brand);
  }

  async remove(id: number): Promise<void> {
    const result = await this.brandsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
  }
}
