import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from '@services/tasks.service';
import { Task } from '@models/task.interface';
import { TaskDto } from '@models/task.dto';
import { FilterDto } from '@models/filter.dto';
import { TaskStatusUpdate } from '@models/task.status.update';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@models/user.interface';
import { GetUser } from '@decorators/get.user.decorator';
import { Serialize } from '@decorators/Serialize';
import { UserEntity } from '@models/user.entity';
import { TaskEntity } from '@models/task.entity';

@Controller('tasks')
export class TasksController {
  private logger: Logger = new Logger();
  constructor(private tasksService: TasksService) {}

  /*@Get()
  async getAllTasks(@Query() filterDTO: FilterDto): Promise<Task[]> {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO);
    } else {
      return await this.tasksService.getAllTasks();
    }
  }*/

  @Get()
  @UseGuards(AuthGuard())
  @Serialize(TaskEntity)
  async getAllTasks(@GetUser() user: User): Promise<Task[]> {
    this.logger.verbose(`User ${user.username} retrieving all tasks`);
    return await this.tasksService.getAllTasks(user);
  }

  @Serialize(TaskEntity)
  @UseGuards(AuthGuard())
  @Post()
  async createTask(
    @Body() taskDTO: TaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const task = await this.tasksService.createTask(
      taskDTO.title,
      taskDTO.description,
      user,
    );
    return task;
  }

  @UseGuards(AuthGuard())
  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    const task: Task = await this.tasksService.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} doesn't Found`);
    }
    return task;
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  async deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    const task = await this.tasksService.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not Found`);
    }
    const deleteTask = await this.tasksService.deleteTaskById(id);
    if (!deleteTask) {
      throw new BadRequestException('Error while the deleting Process');
    }
    return {
      ...task,
      message: 'TaskEntity was deleted',
    };
  }

  @UseGuards(AuthGuard())
  @Patch('/:id')
  async updateTaskStatus(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body('status') taskStatusUpdate: TaskStatusUpdate,
  ): Promise<Task> {
    const task = await this.tasksService.getTaskById(id, user);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    const updateTask = await this.tasksService.updateTaskStatus(
      taskStatusUpdate.status,
      id,
    );
    if (!updateTask) {
      throw new BadRequestException('Error while the update Process');
    }
    return {
      ...updateTask,
      message: 'TaskEntity Status was updated',
    };
  }
}
