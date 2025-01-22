import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return this.clientsRepository.find({
      relations: ['orders'],
    });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { id },
      relations: ['orders'],
    });

    if (!client) {
      throw new NotFoundException(`Client cu ID ${id} nu a fost gasit`);
    }

    return client;
  }

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const client = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(client);
  }

  async findOrCreateByDetails(clientDetails: CreateClientDto): Promise<Client> {
    const existingClient = await this.clientsRepository.findOne({
      where: {
        phoneNumber: clientDetails.phoneNumber,
        firstName: clientDetails.firstName,
        lastName: clientDetails.lastName,
      },
    });

    if (existingClient) {
      return existingClient;
    }

    return this.create(clientDetails);
  }
}
