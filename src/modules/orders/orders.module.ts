import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { ClientsModule } from '../clients/clients.module';
import { CarsModule } from '../cars/cars.module';
import { AccessoriesModule } from '../accesories/accessories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule,
    CarsModule,
    AccessoriesModule
  ],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}