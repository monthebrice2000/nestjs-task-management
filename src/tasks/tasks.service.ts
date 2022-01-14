import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.interface';
import { v4 as uuid } from 'uuid';
import { FilterDto } from './models/filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const task: Task = this.tasks.find((task) => {
      return task.id === id;
    });

    return task;
  }

  deleteTaskById(id: string): boolean {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });
    return true;
  }

  updateTaskStatus(status: TaskStatus, id: string): Task {
    const task: Task = this.tasks.find((task) => {
      return task.id === id;
    });
    task.status = status;
    return task;
  }

  getTasksWithFilters(filterDTO: FilterDto): Task[] {
    const { status, search } = filterDTO;
    let tasks = this.tasks;
    if (status) {
      tasks = this.tasks.filter((task) => {
        return task.status === status;
      });
    }

    if (search) {
      tasks = this.tasks.filter((task) => {
        task.description.includes(search) && task.title.includes(search);
      });
    }

    return tasks;
  }
}
