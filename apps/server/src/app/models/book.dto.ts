import { BookCreateInput } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class BookDTO implements BookCreateInput {
  id: never;
  User: never;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  body: string;
}
