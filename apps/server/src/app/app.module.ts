import { Module } from '@nestjs/common';

import { PrismaModule } from '@crud-api/prisma';
import { BooksController } from './books/books.controller';
import { UsersController } from './users/users.controller';
import { BooksService } from './books/books.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [BooksController, UsersController],
  providers: [BooksService, UsersService],
})
export class AppModule {}
