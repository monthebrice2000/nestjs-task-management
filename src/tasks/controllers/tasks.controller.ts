import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Query() filterDTO: FilterDto): Promise<Task[]> {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO);
    } else {
      return await this.tasksService.getAllTasks();
    }
  }

  @UseGuards(AuthGuard())
  @Post()
  async createTask(@Body() taskDTO: TaskDto): Promise<Task> {
    const task = await this.tasksService.createTask(
      taskDTO.title,
      taskDTO.description,
    );
    return task;
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const task: Task = await this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} doesn't Found`);
    }
    return task;
  }

  @Delete('/:id')
  async deleteTaskById(@Param('id') id: string): Promise<Task> {
    const task = await this.tasksService.getTaskById(id);
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

  @Patch('/:id')
  async updateTaskStatus(
    @Param('id') id: string,
    @Body('status') taskStatusUpdate: TaskStatusUpdate,
  ): Promise<Task> {
    const task = await this.tasksService.getTaskById(id);
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
