import { TaskStatus } from './task.interface';

export class FilterDto {
  status?: TaskStatus;
  search?: string;
}
