import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { TcpContext } from '@nestjs/microservices';

import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

import { EPostgreSQLErorrsCode } from '../database/database-ormconfig.constant';
import { EExceptionType, badRequest } from '../errors';
import { IIncomingMessageData } from '../tcp/tcp.interface';

import { LoggerService } from './logger.service';
import { LoggerStore } from './logger.store';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  public intercept(context: ExecutionContext, next: CallHandler) {
    const rpc_context = context.switchToRpc();
    const tcp_context: TcpContext = rpc_context.getContext();
    const tcp_data: IIncomingMessageData<unknown> = rpc_context.getData();

    const pattern = tcp_context.getPattern();

    const logger_store = new LoggerStore(this.logger, { pattern });
    logger_store.request_id = tcp_data.request_id;
    tcp_data.logger_store = logger_store;

    logger_store.info('TCP execute-start');

    return next.handle().pipe(
      tap(() => logger_store.info('TCP execute-end')),
      catchError((error: Error) => {
        logger_store.error(error.message, error.stack);

        let message: string = error.message;

        if (error instanceof QueryFailedError) {
          if (error.driverError.code in EPostgreSQLErorrsCode) {
            message = EPostgreSQLErorrsCode[error.driverError.code];
          } else {
            message = error.driverError.detail;
          }
        }

        return throwError(() => badRequest(message, EExceptionType.RPC));
      })
    );
  }
}
