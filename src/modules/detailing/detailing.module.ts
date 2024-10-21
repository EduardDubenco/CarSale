import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailingService } from './detailing.service';
import { DetailingController } from './detailing.controller';
import { Detailing } from './detailing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Detailing])],
  providers: [DetailingService],
  controllers: [DetailingController],
  exports: [DetailingService],
})
export class DetailingModule {}
