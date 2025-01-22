import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessoriesService } from './accessories.service';
import { AccessoriesController } from './accessories.controller';
import { Accessory } from './accessory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accessory])],
  providers: [AccessoriesService],
  controllers: [AccessoriesController],
  exports: [AccessoriesService],
})
export class AccessoriesModule {}