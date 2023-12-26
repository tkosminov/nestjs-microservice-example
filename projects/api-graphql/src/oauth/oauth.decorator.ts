import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserRest = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.current_user;
});

export const CurrentUserGql = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const gql_ctx = GqlExecutionContext.create(ctx).getContext();

  return gql_ctx.current_user;
});
