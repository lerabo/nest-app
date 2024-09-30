import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
  ParseIntPipe,
  SetMetadata,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostDto } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post()
  @SetMetadata('roles', ['admin'])
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createData: PostDto): Promise<PostDto> {
    return this.postsService.create(createData);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllPosts(): Promise<PostDto[]> {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number): Promise<PostDto> {
    return this.postsService.getPostById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
