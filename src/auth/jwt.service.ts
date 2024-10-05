import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtCustomService {
  constructor(private jwtService: JwtService) {}

  async verifyToken(token: string): Promise<any> {
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      return await this.jwtService.verify(token, {
        publicKey: process.env.JWT_SECRET,
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
