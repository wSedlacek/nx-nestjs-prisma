import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class CheckoutDTO {
  @Expose()
  @IsString()
  userID: string;
}
