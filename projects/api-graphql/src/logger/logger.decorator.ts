import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const LoggerRest = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  return req.logger_store;
});

export const LoggerGql = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const gql_ctx = GqlExecutionContext.create(ctx).getContext();

  return gql_ctx.logger_store;
});
