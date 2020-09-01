import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { User, Book } from '@prisma/client';
import { UsersService } from './users.service';
import { UserDTO } from '../models';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  public async getUsers(): Promise<User[]> {
    return this.service.getUsers();
  }

  @Get(':id')
  public async getUser(@Param('id') id: string): Promise<User> {
    return this.service.getUser(id);
  }

  @Post()
  public async addUser(@Body() body: UserDTO): Promise<User> {
    return this.service.addUser(body);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserDTO
  ): Promise<User> {
    return this.service.updateUser(id, body);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<User> {
    return this.service.deleteUser(id);
  }

  @Get(':id/books')
  public async getBooks(@Param('id') id: string): Promise<Book[]> {
    return this.service.getBooks(id);
  }
}
