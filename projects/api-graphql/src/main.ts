import '@micro/shared/config';

import { getOrmConfig } from '@micro/shared/database/database-ormconfig.constant';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';

import { AppModule } from './app.module';
import { corsOptionsDelegate } from './cors-options-delegate';

async function bootstrap() {
  await createDatabase({ options: getOrmConfig() as DataSourceOptions, ifNotExist: true });

  const server = express();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    bodyParser: true,
  });

  app.use(json({ limit: process.env.BODY_LIMIT }));
  app.use(
    urlencoded({
      limit: process.env.BODY_LIMIT,
      extended: true,
      parameterLimit: parseInt(process.env.BODY_PARAMETER_LIMIT, 10),
    })
  );
  app.use(cookieParser());

  app.enableCors(corsOptionsDelegate);
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen(parseInt(process.env.APP_PORT, 10));
}

bootstrap();
