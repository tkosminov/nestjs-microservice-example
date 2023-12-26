/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DEFAULT_POSTGRESQL_PORT } from '../config/constants';

// * https://www.postgresql.org/docs/current/errcodes-appendix.html
export enum EPostgreSQLErorrsCode {
  // ! Class 23 — Integrity Constraint Violation
  INTEGRITY_CONSTRAINT_VIOLATION = <any>'23000',
  RESTRICT_VIOLATION = <any>'23001',
  NOT_NULL_VIOLATION = <any>'23502',
  FOREIGN_KEY_VIOLATION = <any>'23503',
  UNIQUE_VIOLATION = <any>'23505',
  CHECK_VIOLATION = <any>'23514',
  EXCLUSION_VIOLATION = <any>'23P01',
}

export function getOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : DEFAULT_POSTGRESQL_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_ENV || process.env.NODE_ENV}_${process.env.DB_NAME}`,
    entities: [__dirname + '/../models/**/*.entity{.ts,.js}'],
    migrations: [process.env.PWD + '/src/migrations/**/*{.ts,.js}'],
    migrationsRun: false,
    synchronize: process.env.DB_SYNCHRONIZE != null ? JSON.parse(process.env.DB_SYNCHRONIZE) : false,
    logging: process.env.DB_LOGGING ? JSON.parse(process.env.DB_LOGGING) : false,
  };
}
