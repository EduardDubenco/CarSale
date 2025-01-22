import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarAttributesService } from './car-attributes.service';
import { CarAttributesController } from './car-attributes.controller';
import { CarAttribute } from './car-attribute.entity';
import { Car } from '../cars/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarAttribute, Car])],
  providers: [CarAttributesService],
  controllers: [CarAttributesController],
  exports: [CarAttributesService],
})
export class CarAttributesModule {}
