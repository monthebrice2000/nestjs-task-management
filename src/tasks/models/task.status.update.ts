import { TaskStatus } from './task.interface';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class TaskStatusUpdate {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
