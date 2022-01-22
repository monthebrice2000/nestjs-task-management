import { Module } from '@nestjs/common';
import { configs_postgres } from '@configs/configs_postgres';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth.module';
import { TasksModule } from '@modules/tasks.module';

@Module({
  imports: [TasksModule, TypeOrmModule.forRoot(configs_postgres), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
