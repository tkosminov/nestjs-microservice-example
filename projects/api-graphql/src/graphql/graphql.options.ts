import { IJwtPayload } from '@micro/shared/types';
import { LoggerStore } from '@micro/shared/logger/logger.store';
import { useLogger } from '@envelop/core';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { HttpException, Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';

import { GraphQLArgs, DocumentNode, GraphQLError } from 'graphql';
import { DataSource } from 'typeorm';
import { setDataSource } from 'nestjs-graphql-easy';

@Injectable()
export class GraphQLOptions implements GqlOptionsFactory {
  constructor(private readonly dataSource: DataSource) {
    setDataSource(this.dataSource);
  }

  public createGqlOptions(): Promise<YogaDriverConfig> | YogaDriverConfig {
    return {
      autoSchemaFile: true,
      driver: YogaDriver,
      context: ({ req }: { req: Request & { logger_store: LoggerStore; current_user: IJwtPayload } }) => ({
        req,
        logger_store: req.logger_store,
        current_user: req.current_user,
      }),
      maskedErrors: {
        maskError(error, message: string) {
          if (error instanceof GraphQLError) {
            if (error.originalError?.name === GraphQLError.name) {
              return error;
            }

            let graphql_error_message = error.originalError?.name || message;
            let original_error_message: unknown = error.message;

            if (error.originalError instanceof HttpException) {
              const response = error.originalError.getResponse();

              if (response) {
                if (typeof response === 'string') {
                  original_error_message = response;
                } else {
                  original_error_message = (response as { message?: unknown }).message;
                }
              }
            } else if (error.originalError?.name === 'NonErrorThrown') {
              graphql_error_message = 'BadRequestException';
              original_error_message = (
                error.originalError as unknown as {
                  name: string;
                  thrownValue: { status: string; message: unknown };
                }
              ).thrownValue.message;
            }

            return new GraphQLError(graphql_error_message, {
              nodes: error.nodes,
              source: error.source,
              positions: error.positions,
              path: error.path,
              extensions: {
                originalError: { message: original_error_message },
              },
            });
          } else {
            return new GraphQLError(message, {
              extensions: {
                originalError: error instanceof Error ? { message: error.message } : undefined,
              },
            });
          }
        },
      },
      plugins: [
        useLogger({
          logFn: (
            event_name: string,
            {
              args,
            }: {
              args: GraphQLArgs & {
                document: DocumentNode;
                contextValue: {
                  req: Request;
                  logger_store: LoggerStore;
                  params: {
                    query: string;
                  };
                };
              };
              result?: unknown;
            }
          ) => {
            const ctx = args.contextValue;
            const logger_store: LoggerStore = ctx.logger_store;

            let operation: string | null = null;
            const selections: string[] = [];

            args.document.definitions.forEach((definition) => {
              if (definition.kind === 'OperationDefinition') {
                operation = definition.operation;

                definition.selectionSet.selections.forEach((selection) => {
                  if (selection.kind === 'Field') {
                    selections.push(selection.name.value);
                  }
                });
              }
            });

            logger_store.info(`GraphQL ${event_name}`, { event: event_name, operation, selections });
          },
        }),
      ],
    };
  }
}
