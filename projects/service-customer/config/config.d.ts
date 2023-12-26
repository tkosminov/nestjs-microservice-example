declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      APP_PORT: string;
      APP_NAME: string;
      LOGGER_LEVEL: string;
      JWT_SECRET: string;

      DB_NAME: string;
      DB_HOST: string;
      DB_PORT?: string;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_LOGGING: string;

      REDIS_HOST: string;
      REDIS_PORT?: string;
      REDIS_KEY: string;
      REDIS_PASSWORD?: string;

      RABBITMQ_HOST: string;
      RABBITMQ_PORT?: string;
      RABBITMQ_VHOST: string;
      RABBITMQ_USERNAME: string;
      RABBITMQ_PASSWORD: string;
      RABBITMQ_EXCHANGE: string;
      RABBITMQ_PREFIX?: string;

      SERVICE_NAMES: string;
    }
  }
}

export {};
