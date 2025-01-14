import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './seller.entity';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
  ) {}

  findAll(): Promise<Seller[]> {
    return this.sellersRepository.find();
  }

  findOne(id: number): Promise<Seller> {
    return this.sellersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.sellersRepository.delete(id);
  }

  async create(seller: Partial<Seller>): Promise<Seller> {
    const newSeller = this.sellersRepository.create(seller);
    return this.sellersRepository.save(newSeller);
  }

  async findByEmail(email: string): Promise<Seller | undefined> {
    return this.sellersRepository.findOneBy({ email });
  }
}
