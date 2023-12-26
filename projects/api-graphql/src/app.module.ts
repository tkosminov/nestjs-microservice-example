import { DatabaseModule } from '@micro/shared/database/database.module';
import { LoggerModule } from '@micro/shared/logger/logger.module';
import { RedisModule } from '@micro/shared/redis/redis.module';
import { RabbitMQModule } from '@micro/shared/rabbitmq/rabbitmq.module';
import { TcpModule } from '@micro/shared/tcp/tcp.module';
import { ModelsModule } from '@micro/shared/models/models.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { LoggerMiddleware } from './logger/logger.middleware';
import { HealthzModule } from './healthz/healthz.module';
import { GraphQLModule } from './graphql/graphql.module';
import { OAuthMiddleware } from './oauth/oauth.middleware';

@Module({
  imports: [
    LoggerModule,
    HealthzModule,
    DatabaseModule,
    RedisModule,
    RabbitMQModule,
    TcpModule,
    GraphQLModule,
    ModelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer.apply(LoggerMiddleware).forRoutes('*');

    consumer.apply(OAuthMiddleware).forRoutes({
      path: 'graphql',
      method: RequestMethod.POST,
    });
  }
}
