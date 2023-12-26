# NestJS microservice example

## Dependencies

* NodeJS 20
  * [ubuntu/debian](https://computingforgeeks.com/how-to-install-node-js-on-ubuntu-debian/)
* Yarn 4
  * [all](https://yarnpkg.com/getting-started/install)
* Redis
  * [ubuntu/debian](https://computingforgeeks.com/how-to-install-redis-on-ubuntu/)
* PostgreSQL 13
  * [ubuntu/debian](https://computingforgeeks.com/how-to-install-postgresql-13-on-ubuntu/)
* RabbitMQ
  * [ubuntu/debian](https://computingforgeeks.com/how-to-install-latest-rabbitmq-server-on-ubuntu-linux/)

## Documentation

* [NestJS](https://docs.nestjs.com/)
* [GraphQL-Yoga](https://the-guild.dev/graphql/yoga-server/docs)

## Installation

```bash
yarn
```

## Package

### Common package

```bash
yarn add ${package_name}
```

or

```bash
yarn add -D ${package_name}
```

### Package for a specific microservice

```bash
yarn workspace ${scope_name} add ${package_name}
```

or

```bash
yarn workspace ${scope_name} add -D ${package_name}
```

## Launch

All services:

```bash
yarn start
```

Specific service:

```bash
yarn start:${scope_name}
```

## Build

```bash
yarn build:${scope_name}
```

## Specific microservice script

```bash
NODE_ENV=$env yarn ${script_name} -w ${scope_name}
```

## Docker (Simple example)

* build
  ```bash
  sudo docker build . --build-arg env=development -f ./projects/service-customer/Dockerfile --progress=plain --no-cache --tag micro-service-customer
  ```
* run
  ```bash
  sudo docker run --network host micro-service-customer
  ```
* get CONTAINER_ID of the running container
  ```bash
  sudo docker ps
  ```
* container bash
  ```bash
  sudo docker exec -it $CONTAINER_ID bash
  ```
* container stop
  ```bash
  sudo docker stop $CONTAINER_ID
  ```
