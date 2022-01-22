import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from '@models/task.interface';
import { TaskEntityRepository } from '@repositories/task.entity.repository';
import { TaskEntity } from '@models/task.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FilterDto } from '@models/filter.dto';
import { User } from '@models/user.interface';
import { UserEntityRepository } from '@repositories/user.entity.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@models/user.entity';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: UserEntityRepository,
    private taskRepository: TaskEntityRepository,
  ) {}

  async getAllTasks(user: User) {
    return await this.taskRepository.find({ user: { ...user } });
  }

  async createTask(
    title: string,
    description: string,
    user: User,
  ): Promise<TaskEntity> {
    const userFind: UserEntity = await this.userEntityRepository.findOne({
      ...user,
    });
    const task: Task = {
      title,
      description,
      status: TaskStatus.OPEN,
      user: { ...userFind },
    };
    return await this.taskRepository.save(task);
  }

  async getTaskById(id: string, user: User): Promise<TaskEntity> {
    const userF = await this.userEntityRepository.findOne({
      ...user,
    });
    console.log(user);
    return await this.taskRepository.findOne({ id, user: userF });
  }

  async deleteTaskById(id: string): Promise<TaskEntity> {
    const taskToDelete = await this.taskRepository.findOne(id);
    return await this.taskRepository.remove(taskToDelete);
  }

  async updateTaskStatus(status: TaskStatus, id: string): Promise<TaskEntity> {
    const task: Task = await this.taskRepository.findOne(id);
    task.status = status;

    return await this.taskRepository.save(task);
  }

  /*async getTasksWithFilters(filterDTO: FilterDto): Promise<Task[]> {
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
  }*/
}
