import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@modules/auth.module';
import { TasksModule } from '@modules/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configs_postgres } from '@configs/configs_postgres';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.MODE}`],
      isGlobal: true,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configs_postgres(configService);
      },
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
