import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './auth.entity';
import { RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';
import * as process from 'node:process';

const saltOrRounds: number = 10;

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

    const isMatch = await bcrypt.compare(userPassword, user?.password);

    if (!isMatch) {
      throw new HttpException('Passwords do not match', HttpStatus.FORBIDDEN);
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
    password: userPassword,
    email,
    name,
    jobTitle,
  }: RegisterDto): Promise<AuthEntity> {
    const hashPass = await bcrypt.hash(userPassword, saltOrRounds);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        jobTitle,
        password: hashPass,
      },
    });

    const { password, ...rest } = user;

    return {
      token: this.jwtService.sign(
        { userId: user.id },
        { privateKey: process.env.JWT_SECRET },
      ),
      user: rest,
    };
  }
}
