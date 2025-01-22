import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerLogin } from './entities/seller-login.entity';
import { Request } from 'express';

@Injectable()
export class SellerLoginService {
  constructor(
    @InjectRepository(SellerLogin)
    private loginRepository: Repository<SellerLogin>,
  ) {}

  async logLogin(
    sellerId: number,
    success: boolean,
    req: Request,
  ): Promise<SellerLogin> {
    const login = this.loginRepository.create({
      sellerId,
      success,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
    });

    return this.loginRepository.save(login);
  }

  async getSellerLogins(sellerId: number): Promise<SellerLogin[]> {
    return this.loginRepository.find({
      where: { sellerId },
      order: { loggedAt: 'DESC' },
      relations: ['seller'],
    });
  }
}
