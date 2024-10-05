import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { AuthEntity } from './auth.entity';
import { RegisterDto } from './dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() { email, password }: LoginDto): Promise<AuthEntity> {
    return this.authService.signIn(email, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sighUp')
  signUp(@Body() body: RegisterDto): Promise<AuthEntity> {
    return this.authService.signUp(body);
  }
}
