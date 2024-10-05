import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtCustomService } from './jwt.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGuard } from './auth.guard';

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
  providers: [AuthService, JwtCustomService, PrismaService, AuthGuard],
  exports: [JwtCustomService],
})
export class AuthModule {}
