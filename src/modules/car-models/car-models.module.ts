import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModelsService } from './car-models.service';
import { CarModelsController } from './car-models.controller';
import { CarModel } from './car-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarModel])],
  providers: [CarModelsService],
  controllers: [CarModelsController],
  exports: [CarModelsService],
})
export class CarModelsModule {}
