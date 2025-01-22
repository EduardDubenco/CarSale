import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellerLoginService } from './seller-login.service';
import { LoginSellerDto } from './dto/Login-seller.dto';
import { UserRole } from './enums/user-role.enum';
import { Seller } from './entities/seller.entity';
import { CreateSellerDto } from './dto/create-seller.dto';
import { SellerLogin } from './entities/seller-login.entity';
import { Response } from 'express';
import { Request } from 'express';

@ApiTags('Vanzatori')
@Controller('sellers')
export class SellersController {
  constructor(
    private readonly sellersService: SellersService,
    private readonly sellerLoginService: SellerLoginService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Autentificare vanzator' })
  @ApiResponse({
    status: 200,
    description: 'Autentificare reusita',
    schema: {
      properties: {
        seller: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            userName: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
          },
        },
      },
    },
  })
  async login(
    @Body() loginSellerDto: LoginSellerDto,
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const seller = await this.sellersService.validatePassword(
      loginSellerDto.email,
      loginSellerDto.password,
      req,
    );
    if (!seller) {
      return { success: false, message: 'Autentificare esuata' };
    }

    const payload = { email: seller.email, sub: seller.id, role: seller.role };
    const token = this.jwtService.sign(payload);

    response.cookie('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    return {
      seller: {
        id: seller.id,
        userName: seller.userName,
        email: seller.email,
        role: seller.role,
      },
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delogare vanzator' })
  @ApiResponse({ status: 200, description: 'Delogare reusita' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('auth-token');
    return { success: true, message: 'Delogare reusita' };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obtineti toti vanzatorii' })
  @ApiResponse({
    status: 200,
    description: 'Lista de vanzatori',
    type: [Seller],
  })
  findAll(): Promise<Seller[]> {
    return this.sellersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtineti un vanzator dupa ID' })
  @ApiResponse({ status: 200, description: 'Detalii vanzator', type: Seller })
  findOne(@Param('id') id: number, @Req() req): Promise<Seller> {
    if (req.user.id !== id && req.user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'Nu aveti permisiunea de a accesa acest profil',
      );
    }
    return this.sellersService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Creati un nou vanzator' })
  @ApiResponse({
    status: 201,
    description: 'Vanzator creat',
    type: Seller,
  })
  create(@Body() createSellerDto: CreateSellerDto): Promise<Seller> {
    return this.sellersService.create(createSellerDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Stergeti un vanzator dupa ID' })
  @ApiResponse({ status: 200, description: 'Vanzator sters' })
  remove(@Param('id') id: number): Promise<void> {
    return this.sellersService.remove(id);
  }

  @Get(':id/logins')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtine istoricul de logari pentru un vanzator' })
  @ApiResponse({
    status: 200,
    description: 'Istoric logari',
    type: [SellerLogin],
  })
  getSellerLogins(@Param('id') id: number, @Req() req): Promise<SellerLogin[]> {
    if (req.user.id !== id && req.user.role !== UserRole.ADMIN) {
      throw new UnauthorizedException(
        'Nu aveti permisiunea de a accesa acest istoric',
      );
    }
    return this.sellerLoginService.getSellerLogins(id);
  }
}
