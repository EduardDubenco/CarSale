import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { SellersService } from '../sellers/sellers.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => SellersService))
    private sellersService: SellersService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req || !req.cookies) return null;
        return req.cookies['auth-token'];
      },
      secretOrKey: 'your-secret-key',
    });
  }

  async validate(payload: any) {
    const seller = await this.sellersService.findOne(payload.sub);
    if (!seller) {
      throw new UnauthorizedException();
    }
    return seller;
  }
}
