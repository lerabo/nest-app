import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './auth.entity';
import { User } from '@prisma/client';
import { RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import * as process from 'node:process';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, userPassword: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found with email ${email}`);
    }
    if (user.password !== userPassword) {
      throw new UnauthorizedException();
    }

    const { password, ...rest } = user;
    return {
      token: this.jwtService.sign(
        { userId: user.id },
        { privateKey: process.env.JWT_SECRET },
      ),
      user: rest,
    };
  }

  async signUp({
    password,
    email,
    name,
    jobTitle,
  }: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        email,
        name,
        jobTitle,
        password: hashedPassword,
      },
    });
  }
}
