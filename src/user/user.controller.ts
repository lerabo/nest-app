import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get('all')
  @HttpCode(HttpStatus.OK)
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getPostById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request & { user: any },
  ): Promise<Omit<User, 'password'>> {
    console.log(req.user);
    return this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getProfile(
    @Req() req: Request & { user: User },
  ): Promise<Omit<User, 'password'>> {
    return this.userService.getUserById(req.user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
