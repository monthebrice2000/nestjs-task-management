import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './models/task.interface';
import { v4 as uuid } from 'uuid';
import { FilterDto } from './models/filter.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from './models/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntityRepository } from './models/task.entity.repository';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(private taskRepository: TaskEntityRepository) {}

  async getAllTasks() {
    return await this.taskRepository.find();
  }

  async createTask(title: string, description: string): Promise<TaskEntity> {
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
    };

    //this.tasks.push(task);
    return await this.taskRepository.save(task);
  }

  async getTaskById(id: string): Promise<TaskEntity> {
    /*const task: Task = this.tasks.find((task) => {
      return task.id === id;
    });*/

    return await this.taskRepository.findOne(id);
  }

  async deleteTaskById(id: string): Promise<DeleteResult> {
    this.tasks = this.tasks.filter((task) => {
      return task.id !== id;
    });
    return await this.taskRepository.delete(id);
  }

  async updateTaskStatus(
    status: TaskStatus,
    id: string,
  ): Promise<UpdateResult> {
    const task: Task = await this.taskRepository.findOne(id);
    task.status = status;
    // @ts-ignore
    return await this.taskRepository.update(task);
  }

  async getTasksWithFilters(filterDTO: FilterDto): Promise<Task[]> {
    const { status, search } = filterDTO;
    let tasks: Task[] = await this.getAllTasks();
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
