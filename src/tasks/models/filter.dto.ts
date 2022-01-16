import { TaskStatus } from './task.interface';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  search?: string;
}
