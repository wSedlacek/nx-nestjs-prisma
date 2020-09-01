import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@crud-api/prisma';
import { User, Book } from '@prisma/client';
import { UserDTO } from '../models';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public async getUser(id: string): Promise<User> {
    const user = await this.prisma.user.findOne({
      where: { id },
      include: { books: true },
    });
    if (!user) throw new NotFoundException();
    return user;
  }

  public async addUser(data: UserDTO): Promise<User> {
    return this.prisma.user.create({ data });
  }

  public async updateUser(id: string, data: UserDTO): Promise<User> {
    await this.getUser(id);
    return this.prisma.user.update({ where: { id }, data });
  }

  public async deleteUser(id: string): Promise<User> {
    await this.getUser(id);
    return this.prisma.user.delete({ where: { id } });
  }

  public async getBooks(userId: string): Promise<Book[]> {
    await this.getUser(userId);
    return this.prisma.book.findMany({ where: { userId } });
  }
}
