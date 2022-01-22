import { IsNotEmpty, MinLength } from 'class-validator';
import { User } from '@models/user.interface';
import { Exclude, Expose } from 'class-transformer';

export class TaskDto {
  @IsNotEmpty()
  @Expose()
  title: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Please description must have great than 6 characters',
  })
  @Expose()
  description: string;
  @Exclude()
  user: User;
}
