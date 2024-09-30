import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';

import { NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import process from 'node:process';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = this.jwtService.verify(token, {
        publicKey: process.env.JWT_SECRET,
      });
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
