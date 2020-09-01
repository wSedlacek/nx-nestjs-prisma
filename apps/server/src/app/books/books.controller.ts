import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { BooksService } from './books.service';
import { BookDTO, CheckoutDTO, Message } from '../models';

@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @Get()
  public async getBooks(): Promise<Book[]> {
    return this.service.getBooks();
  }

  @Get(':id')
  public async getBook(@Param('id') id: string): Promise<Book> {
    return this.service.getBook(id);
  }

  @Post()
  public async addBook(@Body() body: BookDTO): Promise<Book> {
    return this.service.addBook(body);
  }

  @Put(':id')
  public async updateBook(@Param('id') id: string, @Body() body: BookDTO) {
    return this.service.updateBook(id, body);
  }

  @Delete(':id')
  public async deleteBook(@Param('id') id: string) {
    return this.service.deleteBook(id);
  }

  @Post(':id/checkout')
  public async checkout(
    @Param('id') bookID: string,
    @Body() { userID }: CheckoutDTO
  ): Promise<Message> {
    await this.service.checkout(bookID, userID);
    return {
      message: `Successfully checked out book(${bookID}) to user(${userID})`,
    };
  }
}
