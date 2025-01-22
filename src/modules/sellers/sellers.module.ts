import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellersService } from './sellers.service';
import { SellerLoginService } from './seller-login.service';
import { SellersController } from './sellers.controller';
import { Seller } from './entities/seller.entity';
import { SellerLogin } from './entities/seller-login.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Seller, SellerLogin]),
    forwardRef(() => AuthModule), // Add forwardRef here
  ],
  providers: [SellersService, SellerLoginService],
  controllers: [SellersController],
  exports: [SellersService, SellerLoginService],
})
export class SellersModule {}
