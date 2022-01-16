import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks/models/task.entity';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/models/user.entity';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.188.82.218',
      port: 5432,
      username: 'postgres',
      password: '2000',
      database: 'nest-auth',
      entities: [TaskEntity, UserEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
