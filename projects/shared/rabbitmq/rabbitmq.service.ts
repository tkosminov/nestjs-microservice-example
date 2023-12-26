import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

@Injectable()
export class RabbitMQService {
  constructor(private readonly amqp_connection: AmqpConnection) {}

  public async send<T>(routing_key: string, message: T) {
    this.amqp_connection.channel.publish(
      `${process.env.RABBITMQ_PREFIX}${process.env.RABBITMQ_EXCHANGE}`,
      routing_key,
      Buffer.from(JSON.stringify(message)),
      {
        timestamp: Date.now(),
        correlationId: v4(),
      }
    );
  }
}
