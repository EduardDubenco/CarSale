import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SellersModule } from './modules/sellers/sellers.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DetailingModule } from './modules/detailing/detailing.module';
import { CarsModule } from './modules/cars/cars.module';
import { CarModelsModule } from './modules/car-models/car-models.module';
import { CarBrandsModule } from './modules/car-brands/car-brands.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'test_user',
      password: process.env.DATABASE_PASSWORD || 'test_pass',
      database: process.env.DATABASE_NAME || 'test_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SellersModule,
    OrdersModule,
    DetailingModule,
    CarsModule,
    CarModelsModule,
    CarBrandsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
