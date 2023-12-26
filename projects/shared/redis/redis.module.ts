import { Global, Module } from '@nestjs/common';

import { redis_providers } from './redis.providers';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [],
  providers: [...redis_providers, RedisService],
  exports: [...redis_providers, RedisService],
})
export class RedisModule {}
