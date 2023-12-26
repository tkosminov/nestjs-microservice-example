import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import {
  AmqpConnection,
  MessageHandlerErrorBehavior,
  RabbitMQModule as NestJSRabbitMQModule,
  RABBIT_HANDLER,
  RabbitHandlerConfig,
} from '@golevelup/nestjs-rabbitmq';
import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';

import { DEFAULT_RABBITMQ_PORT } from '../config/constants';

import { RabbitMQService } from './rabbitmq.service';

@Global()
@Module({
  imports: [
    DiscoveryModule,
    NestJSRabbitMQModule.forRoot(NestJSRabbitMQModule, {
      exchanges: [
        {
          name: `${process.env.RABBITMQ_PREFIX}${process.env.RABBITMQ_EXCHANGE}`,
          type: 'direct',
          options: {
            durable: true,
          },
        },
      ],
      uri: `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${
        process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT, 10) : DEFAULT_RABBITMQ_PORT
      }/${process.env.RABBITMQ_VHOST}`,
      prefetchCount: 30,
      defaultRpcErrorBehavior: MessageHandlerErrorBehavior.NACK,
      defaultSubscribeErrorBehavior: MessageHandlerErrorBehavior.NACK,
      connectionInitOptions: { wait: true },
    }),
  ],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule implements OnModuleInit {
  constructor(
    private readonly discover: DiscoveryService,
    @Inject(AmqpConnection) private readonly connection: AmqpConnection
  ) {}

  public async onModuleInit() {
    const rabbit_meta = await this.discover.providerMethodsWithMetaAtKey<RabbitHandlerConfig>(RABBIT_HANDLER);

    const exchanges = rabbit_meta.reduce<Set<string>>((acc, curr) => {
      if (
        curr.meta.exchange &&
        !curr.meta.exchange.startsWith(`${process.env.RABBITMQ_PREFIX}${process.env.RABBITMQ_EXCHANGE}`)
      ) {
        acc.add(curr.meta.exchange);
      }

      return acc;
    }, new Set([]));

    await new Promise((resolve) => {
      this.connection.managedChannel.waitForConnect(async () => {
        for (const exchange of exchanges) {
          await this.connection.channel.assertExchange(exchange, 'direct');
        }

        return resolve(true);
      });
    });
  }
}
