import { Task } from '@models/task.interface';

export interface User {
  id?: string;
  username?: string;
  password?: string;
  tasks?: Task[];
}
