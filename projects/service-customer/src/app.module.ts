import { DatabaseModule } from '@micro/shared/database/database.module';
import { RedisModule } from '@micro/shared/redis/redis.module';
import { RabbitMQModule } from '@micro/shared/rabbitmq/rabbitmq.module';
import { TcpModule } from '@micro/shared/tcp/tcp.module';
import { ModelsModule } from '@micro/shared/models/models.module';
import { LoggerInterceptor } from '@micro/shared/logger/logger.interceptor';
import { LoggerModule } from '@micro/shared/logger/logger.module';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [LoggerModule, DatabaseModule, RedisModule, RabbitMQModule, TcpModule, ModelsModule, ControllersModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
