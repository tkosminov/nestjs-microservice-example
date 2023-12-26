import { TcpService } from '@micro/shared/tcp/tcp.service';
import { User } from '@micro/shared/models/user/user.entity';
import { Inject } from '@nestjs/common';
import { Args, Context, GraphQLExecutionContext, Resolver } from '@nestjs/graphql';
import { Loader, ELoaderType, Filter, Order, Pagination, Query, Mutation } from 'nestjs-graphql-easy';
import { LoggerStore } from '@micro/shared/logger/logger.store';
import { IJwtPayload } from '@micro/shared/types';
import { UserCreateDTO } from '@micro/shared/models/user/dto/create.dto';
import { UserUpdateDTO } from '@micro/shared/models/user/dto/update.dto';
import { UserDeleteDTO } from '@micro/shared/models/user/dto/delete.dto';
import { EMessagePattern } from '@micro/shared/tcp/tcp.interface';
import { lastValueFrom } from 'rxjs';

import { LoggerGql } from '../../logger/logger.decorator';
import { CurrentUserGql } from '../../oauth/oauth.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(process.env.SERVICE_CUSTOMER_NAME) private readonly customer_client: TcpService) {}

  @Query(() => [User])
  protected async users(
    @Loader({
      loader_type: ELoaderType.MANY,
      field_name: 'users',
      entity: () => User,
      entity_fk_key: 'id',
    })
    field_alias: string,
    @Filter(() => User) _filter: unknown,
    @Order(() => User) _order: unknown,
    @Pagination() _pagination: unknown,
    @Context() ctx: GraphQLExecutionContext
  ) {
    return ctx[field_alias];
  }

  @Mutation(() => User)
  protected async userCreate(
    @LoggerGql() logger: LoggerStore,
    @CurrentUserGql() current_user: IJwtPayload,
    @Args('data') data: UserCreateDTO
  ) {
    return lastValueFrom(
      this.customer_client.send(EMessagePattern.user_create, {
        data,
        current_user,
        request_id: logger.request_id,
      })
    );
  }

  @Mutation(() => User)
  protected async userUpdate(
    @LoggerGql() logger: LoggerStore,
    @CurrentUserGql() current_user: IJwtPayload,
    @Args('data') data: UserUpdateDTO
  ) {
    return lastValueFrom(
      this.customer_client.send(EMessagePattern.user_update, {
        data,
        current_user,
        request_id: logger.request_id,
      })
    );
  }

  @Mutation(() => User)
  protected async userDelete(
    @LoggerGql() logger: LoggerStore,
    @CurrentUserGql() current_user: IJwtPayload,
    @Args('data') data: UserDeleteDTO
  ) {
    return lastValueFrom(
      this.customer_client.send(EMessagePattern.user_delete, {
        data,
        current_user,
        request_id: logger.request_id,
      })
    );
  }
}
