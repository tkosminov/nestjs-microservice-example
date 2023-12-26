import { YogaDriverConfig, YogaDriver } from '@graphql-yoga/nestjs';
import { Module } from '@nestjs/common';
import { GraphQLModule as NestJSGraphQLModule } from '@nestjs/graphql';

import { GraphQLOptions } from './graphql.options';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [
    NestJSGraphQLModule.forRootAsync<YogaDriverConfig>({
      imports: [],
      useClass: GraphQLOptions,
      inject: [],
      driver: YogaDriver,
    }),
  ],
  providers: [UserResolver],
  exports: [],
})
export class GraphQLModule {}
