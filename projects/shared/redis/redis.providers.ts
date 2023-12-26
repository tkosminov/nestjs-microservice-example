import { Provider } from '@nestjs/common';

import IORedis, { Redis } from 'ioredis';

import { DEFAULT_REDIS_PORT } from '../config/constants';

import { REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from './redis.constants';

export const redis_providers: Provider[] = [
  {
    useFactory: (): Redis =>
      new IORedis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : DEFAULT_REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        keyPrefix: process.env.REDIS_KEY,
      }),
    provide: REDIS_SUBSCRIBER_CLIENT,
  },
  {
    useFactory: (): Redis =>
      new IORedis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : DEFAULT_REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        keyPrefix: process.env.REDIS_KEY,
      }),
    provide: REDIS_PUBLISHER_CLIENT,
  },
];
