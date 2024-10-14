import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  findOne(id: number): Promise<Client> {
    return this.clientsRepository.findOneBy({ id });
  }
}
