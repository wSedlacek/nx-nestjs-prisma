import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@crud-api/prisma';
import { Book } from '@prisma/client';
import { BookDTO } from '../models';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  public async getBooks(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  public async getBook(id: string): Promise<Book> {
    const book = await this.prisma.book.findOne({ where: { id } });
    if (!book) throw new NotFoundException();
    return book;
  }

  public async addBook(data: BookDTO): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  public async updateBook(id: string, data: BookDTO): Promise<Book> {
    await this.getBook(id);
    return this.prisma.book.update({ where: { id }, data });
  }

  public async deleteBook(id: string): Promise<Book> {
    await this.getBook(id);
    return this.prisma.book.delete({ where: { id } });
  }

  public async validateUser(id: string): Promise<void> {
    const user = await this.prisma.user.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
  }

  public async checkout(bookID: string, userID: string): Promise<void> {
    await this.validateUser(userID);
    await this.prisma.book.update({
      where: { id: bookID },
      data: { User: { connect: { id: userID } } },
    });
  }
}
