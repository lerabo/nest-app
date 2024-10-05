import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtCustomService } from './jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtCustomService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = context.switchToHttp().getRequest().headers['authorization'];

    if (!jwt) {
      return false;
    }

    try {
      request.user = await this.jwtService.verifyToken(
        jwt.replace('Bearer ', ''),
      );
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
