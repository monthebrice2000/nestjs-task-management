import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.port_app;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT) || port);
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
