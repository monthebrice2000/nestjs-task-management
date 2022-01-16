import { IsNotEmpty, MinLength } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MinLength(6, {
    message: 'Please description must have great than 6 characters',
  })
  description: string;
}
