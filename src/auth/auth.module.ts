import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtMiddleware } from './jwt.middleware';
import { PrismaService } from '../prisma/prisma.service';

export const jwtSecret = process.env.JWT_SECRET;

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtMiddleware, PrismaService],
  exports: [JwtMiddleware],
})
export class AuthModule {}
