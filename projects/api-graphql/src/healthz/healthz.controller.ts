import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  MicroserviceHealthIndicator,
  HealthIndicatorFunction,
} from '@nestjs/terminus';

import { DEFAULT_RABBITMQ_PORT, DEFAULT_REDIS_PORT } from '@micro/shared/config/constants';

import { SERVICE_NAMES, TOTAL_MEMORY_HEAP, TOTAL_MEMORY_RSS } from './healthz.constants';

@Controller('healthz')
export class HealthzController {
  constructor(
    private readonly healthz: HealthCheckService,
    private readonly db_healthz: TypeOrmHealthIndicator,
    private readonly memory_healthz: MemoryHealthIndicator,
    private readonly micro_healthz: MicroserviceHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  public async check() {
    const service_ping_checks: HealthIndicatorFunction[] = [
      () => this.db_healthz.pingCheck('PostgreSQL'),
      () =>
        this.micro_healthz.pingCheck('Redis', {
          transport: Transport.REDIS,
          options: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : DEFAULT_REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            keyPrefix: process.env.REDIS_KEY,
          },
        }),
      () =>
        this.micro_healthz.pingCheck('RabbitMQ', {
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}:${
                process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT, 10) : DEFAULT_RABBITMQ_PORT
              }/${process.env.RABBITMQ_VHOST}`,
            ],
          },
        }),
      () => this.memory_healthz.checkHeap('MEMORY_HEAP', TOTAL_MEMORY_HEAP),
      () => this.memory_healthz.checkRSS('MEMORY_RSS', TOTAL_MEMORY_RSS),
    ];

    SERVICE_NAMES.forEach((name) => {
      const service_name = process.env[`SERVICE_${name}_NAME`];
      const service_host = process.env[`SERVICE_${name}_HOST`];
      const service_port = process.env[`SERVICE_${name}_PORT`];

      if (service_name && service_port && service_host) {
        service_ping_checks.push(() =>
          this.micro_healthz.pingCheck(service_name, {
            transport: Transport.TCP,
            options: {
              host: service_host,
              port: parseInt(service_port, 10),
            },
          })
        );
      }
    });

    return this.healthz.check(service_ping_checks);
  }
}
