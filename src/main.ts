import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { JwtCustomService } from './auth/jwt.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // const jwtService = app.get(JwtCustomService);
  // app.useGlobalGuards(new AuthGuard(jwtService));
  await app.listen(3000);
}
bootstrap();
