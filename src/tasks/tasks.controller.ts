import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './models/task.interface';
import { TaskDto } from './models/task.dto';
import { FilterDto } from './models/filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDTO: FilterDto): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getTasksWithFilters(filterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Post()
  createTask(@Body() taskDTO: TaskDto): Task {
    const task = this.tasksService.createTask(
      taskDTO.title,
      taskDTO.description,
    );
    return task;
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const task: Task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new BadRequestException("Task doesn't exists");
    }
    return task;
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new BadRequestException("Task doesn't exists");
    }
    const deleteTask = this.tasksService.deleteTaskById(id);
    if (!deleteTask) {
      throw new BadRequestException('Error while the deleting Process');
    }
    return {
      ...task,
      message: 'Task was deleted',
    };
  }

  @Patch('/:id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      throw new BadRequestException("Task doesn't exists");
    }
    const updateTask = this.tasksService.updateTaskStatus(status, id);
    if (!updateTask) {
      throw new BadRequestException('Error while the update Process');
    }
    return {
      ...updateTask,
      message: 'Task Status was updated',
    };
  }
}
