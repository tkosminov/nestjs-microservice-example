import { Inject, Injectable } from '@nestjs/common';

import Redis, { RedisKey } from 'ioredis';
import { Observable, Observer } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { v4 } from 'uuid';

import { REDIS_EXPIRE_TIME_IN_SECONDS, REDIS_PUBLISHER_CLIENT, REDIS_SUBSCRIBER_CLIENT } from './redis.constants';

export interface IRedisSubscribeMessage {
  readonly message: string;
  readonly channel: string;
}

@Injectable()
export class RedisService {
  public readonly id: string = v4();

  constructor(
    @Inject(REDIS_SUBSCRIBER_CLIENT) private readonly sub_client: Redis,
    @Inject(REDIS_PUBLISHER_CLIENT) private readonly pub_client: Redis
  ) {}

  public fromEvent<T>(event_name: string): Observable<T> {
    this.sub_client.subscribe(`${process.env.REDIS_KEY}_${event_name}`);

    return new Observable((observer: Observer<IRedisSubscribeMessage>) =>
      this.sub_client.on('message', (channel, message) => observer.next({ channel, message }))
    ).pipe(
      filter(({ channel }) => channel === `${process.env.REDIS_KEY}_${event_name}`),
      map(({ message }) => JSON.parse(message))
    );
  }

  public async publish(event_name: string, value: Record<string, unknown>): Promise<number> {
    return new Promise<number>((resolve, reject) =>
      this.pub_client.publish(
        `${process.env.REDIS_KEY}_${event_name}`,
        JSON.stringify({ redis_id: this.id, ...value }),
        (error, reply) => {
          if (error) {
            return reject(error);
          }

          return resolve(reply!);
        }
      )
    );
  }

  public async exists(key: RedisKey) {
    return !!(await this.pub_client.exists(key));
  }

  public async get<T>(key: RedisKey) {
    const res = await this.pub_client.get(key);

    if (res) {
      return JSON.parse(res) as T;
    }

    return null;
  }

  public async set(key: RedisKey, value: unknown, expire_time_in_seconds: number = REDIS_EXPIRE_TIME_IN_SECONDS) {
    await this.pub_client.set(key, JSON.stringify(value), 'EX', expire_time_in_seconds);
  }

  public async del(key: RedisKey) {
    return await this.pub_client.del(key);
  }

  public async hexists(key: RedisKey, field: string) {
    return !!(await this.pub_client.hexists(key, field));
  }

  public async hset(key: RedisKey, field: string, value: unknown) {
    return await this.pub_client.hset(key, field, JSON.stringify(value));
  }

  public async hget<T>(key: RedisKey, field: string) {
    const res = await this.pub_client.hget(key, field);

    if (res) {
      return JSON.parse(res) as T;
    }

    return null;
  }

  public async hdel(key: RedisKey, ...fields: string[]) {
    return await this.pub_client.hdel(key, ...fields);
  }

  public async lpush(key: RedisKey, value: unknown) {
    return await this.pub_client.lpush(key, JSON.stringify(value));
  }

  public async rpush(key: RedisKey, value: unknown) {
    return await this.pub_client.rpush(key, JSON.stringify(value));
  }

  public async lpop<T>(key: RedisKey, count: number) {
    const arr = await this.pub_client.lpop(key, count);

    if (arr) {
      return arr.map((i) => JSON.parse(i)) as T[];
    }

    return null;
  }

  public async rpop<T>(key: RedisKey, count: number) {
    const arr = await this.pub_client.rpop(key, count);

    if (arr) {
      return arr.map((i) => JSON.parse(i)) as T[];
    }

    return null;
  }

  public async llen(key: RedisKey) {
    return await this.pub_client.llen(key);
  }

  public async lpos(key: RedisKey, value: string | number) {
    return await this.pub_client.lpos(key, value);
  }

  public async mget<T>(keys: RedisKey[]) {
    const res = await this.pub_client.mget(keys);

    return res.map((data) => (data ? (JSON.parse(data) as T) : null));
  }

  public async mset(data: RedisKey[]) {
    await this.pub_client.mset(data);
  }
}
