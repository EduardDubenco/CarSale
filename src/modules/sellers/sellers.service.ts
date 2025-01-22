import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seller } from './entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { SellerLoginService } from './seller-login.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

@Injectable()
export class SellersService {
  constructor(
    @InjectRepository(Seller)
    private sellersRepository: Repository<Seller>,
    private sellerLoginService: SellerLoginService,
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
    const { userName, password, email, role } = sellerDto;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newSeller = this.sellersRepository.create({
      userName,
      email,
      passwordHash,
      salt,
      role,
    });

    return this.sellersRepository.save(newSeller);
  }

  async findByEmail(email: string): Promise<Seller | undefined> {
    return this.sellersRepository.findOneBy({ email });
  }

  async validatePassword(
    email: string,
    password: string,
    req: Request,
  ): Promise<Seller | null> {
    const seller = await this.findByEmail(email);
    if (!seller) {
      await this.sellerLoginService.logLogin(0, false, req);
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, seller.passwordHash);
    await this.sellerLoginService.logLogin(seller.id, isPasswordValid, req);
    return isPasswordValid ? seller : null;
  }
}
