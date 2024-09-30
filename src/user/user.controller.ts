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
} from '@nestjs/common';

import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllPosts(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getPostById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.getUserById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
