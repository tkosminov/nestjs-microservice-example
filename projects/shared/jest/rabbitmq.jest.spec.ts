import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Provider } from '@nestjs/common';
import { mock } from 'jest-mock-extended';

import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

export function rabbitMQProvidersMock(): Provider[] {
  return [
    {
      provide: AmqpConnection,
      useValue: mock<AmqpConnection>(),
    },
    RabbitMQService,
  ];
}
