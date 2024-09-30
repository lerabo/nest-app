import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Post) {
    return this.prisma.post.create({ data });
  }

  async getAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }

  async getPostById(id: number): Promise<Post> {
    return this.prisma.post.findUnique({
      where: { id: id },
    });
  }

  async remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
