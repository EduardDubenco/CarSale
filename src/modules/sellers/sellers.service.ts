import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './seller.entity';
import * as bcrypt from 'bcrypt';
import { CreateSellerDto } from './dto/create-seller.dto';

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

  async create(sellerDto: CreateSellerDto): Promise<Seller> {
    const { userName, password, email } = sellerDto;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newSeller = this.sellersRepository.create({
      userName,
      email,
      passwordHash,
      salt,
    });

    return this.sellersRepository.save(newSeller);
  }

  async findByEmail(email: string): Promise<Seller | undefined> {
    return this.sellersRepository.findOneBy({ email });
  }

  async validatePassword(
    email: string,
    password: string,
  ): Promise<Seller | null> {
    const seller = await this.findByEmail(email);
    if (!seller) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, seller.passwordHash);
    return isPasswordValid ? seller : null;
  }
}
