import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      req['user'] = this.jwtService.verify(token, {
        publicKey: process.env.JWT_SECRET,
      });
      next();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
