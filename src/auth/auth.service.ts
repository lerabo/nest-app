import {
  BadRequestException,
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

    delete user.password;

    return {
      token: this.jwtService.sign(
        { id: user.id, email: user.email },
        { privateKey: process.env.JWT_SECRET },
      ),
      user: user,
    };
  }

  async signUp({
    password: userPassword,
    email,
    name,
    jobTitle,
    surname,
  }: RegisterDto): Promise<AuthEntity> {
    try {
      const hashPass = await bcrypt.hash(userPassword, saltOrRounds);

      const user = await this.prisma.user.create({
        data: {
          email,
          name,
          surname,
          jobTitle: jobTitle,
          password: hashPass,
        },
      });

      delete user.password;

      return {
        token: this.jwtService.sign(
          { id: user.id, email: user.email },
          { privateKey: process.env.JWT_SECRET },
        ),
        user: user,
      };
    } catch {
      throw new BadRequestException(`User already exists with email ${email}`);
    }
  }
}
