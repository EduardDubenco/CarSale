import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detailing } from './detailing.entity';

@Injectable()
export class DetailingService {
  constructor(
    @InjectRepository(Detailing)
    private detailingRepository: Repository<Detailing>,
  ) {}

  findAll(): Promise<Detailing[]> {
    return this.detailingRepository.find();
  }

  findOne(id: number): Promise<Detailing> {
    return this.detailingRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.detailingRepository.delete(id);
  }

  async create(detailing: Partial<Detailing>): Promise<Detailing> {
    const newDetailing = this.detailingRepository.create(detailing);
    return this.detailingRepository.save(newDetailing);
  }
}
