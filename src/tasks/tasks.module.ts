import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntityRepository } from '@models/task.entity.repository';
import { AuthModule } from '@modules/auth.module';
import { TasksController } from '@controllers/tasks.controller';
import { TasksService } from '@services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntityRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
