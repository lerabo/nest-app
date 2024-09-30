import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';
import { AuthEntity } from './auth.entity';
import { RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() { email, password }: LoginDto): Promise<AuthEntity> {
    return this.authService.signIn(email, password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() body: RegisterDto): Promise<AuthEntity> {
    return this.authService.signUp(body);
  }
}
