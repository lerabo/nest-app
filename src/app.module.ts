import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtCustomService } from './auth/jwt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PostsModule, PrismaModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtCustomService, JwtService],
})
export class AppModule {}
