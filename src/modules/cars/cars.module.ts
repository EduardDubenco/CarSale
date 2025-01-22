import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { Car } from './car.entity';
import { CarAttributesModule } from '../car-atributes/car-attributes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), CarAttributesModule],
  providers: [CarsService],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
