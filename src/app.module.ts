import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// Importați modulele dvs. aici, de exemplu: SellersModule, ClientsModule, etc.

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'postgres',
      database: process.env.DATABASE_NAME || 'car_sale',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Dezactivați în producție
    }),
    // Adăugați modulele dvs. aici
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
