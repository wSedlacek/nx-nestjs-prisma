import { UserCreateInput } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class UserDTO implements UserCreateInput {
  id: never;
  books: never;

  @Expose()
  @IsString()
  name: string;
}
