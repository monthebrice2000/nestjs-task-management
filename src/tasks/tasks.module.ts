import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth.module';
import { TasksController } from '@controllers/tasks.controller';
import { TasksService } from '@services/tasks.service';
import { UserEntityRepository } from '@repositories/user.entity.repository';
import { TaskEntity } from '@models/task.entity';
import { UserEntity } from '@models/user.entity';
import { TaskEntityRepository } from '@repositories/task.entity.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntityRepository, UserEntity]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
