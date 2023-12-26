import '@micro/shared/config';

import { getOrmConfig } from '@micro/shared/database/database-ormconfig.constant';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

import { AppModule } from './app.module';

async function bootstrap() {
  await createDatabase({ options: getOrmConfig() as DataSourceOptions, ifNotExist: true });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.APP_PORT, 10),
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen();
}

bootstrap();
