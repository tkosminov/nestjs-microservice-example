FROM node:20-alpine

# Env

ARG env
ARG commit_short_sha
ARG pipeline_created_at

# Timezone

RUN apk update
RUN apk add --update tzdata && \
                     cp /usr/share/zoneinfo/UTC /etc/localtime && \
                     echo "UTC" > /etc/timezone

# Apk

RUN apk add --update --no-cache --virtual runtime-deps \
                                          nano \
                                          readline \
                                          bash \
                                          htop

# Nginx

RUN apk add --update --no-cache nginx \
                                nginx-mod-http-lua && \
                                mkdir -p /run/nginx

# Packages

WORKDIR /server

COPY .yarn ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY projects/api-graphql/package.json ./projects/api-graphql/package.json
COPY projects/shared/package.json ./projects/shared/package.json

RUN yarn

# Nginx Config

COPY projects/api-graphql/nginx.conf /etc/nginx/http.d/default.conf

RUN nginx -t

# App

COPY tsconfig.json tsconfig.eslint.json .eslintrc.js .eslintignore ./
COPY projects/tsconfig.json ./projects/tsconfig.json
COPY projects/api-graphql ./projects/api-graphql
COPY projects/shared ./projects/shared

RUN yarn build:graphql

# Build info

ENV DOCKER_DEPLOY true
ENV ALLOW_CONFIG_MUTATIONS true
ENV NODE_ENV ${env}
ENV COMMIT_SHORT_SHA ${commit_short_sha}
ENV PIPELINE_CREATED_AT ${pipeline_created_at}

RUN touch build_info.txt
RUN echo "env: ${env}" >> build_info.txt
RUN echo "commit_short_sha: ${commit_short_sha}" >> build_info.txt
RUN echo "pipeline_created_at: ${pipeline_created_at}" >> build_info.txt

# Run

EXPOSE 80

CMD nginx; yarn workspace @micro/api-graphql start:build
