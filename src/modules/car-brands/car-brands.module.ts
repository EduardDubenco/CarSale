import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarBrandsService } from './car-brands.service';
import { CarBrandsController } from './car-brands.controller';
import { CarBrand } from './car-brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarBrand])],
  providers: [CarBrandsService],
  controllers: [CarBrandsController],
  exports: [CarBrandsService],
})
export class CarBrandsModule {}
