import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtCustomService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async verifyToken(token: string): Promise<any> {
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.jwtService.verify(token, {
        publicKey: process.env.JWT_SECRET,
      });

      const userObject = await this.prisma.user.findUnique({
        where: { id: user?.userId },
      });

      delete userObject.password;

      return userObject;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
