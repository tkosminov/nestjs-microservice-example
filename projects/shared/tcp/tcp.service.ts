import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

import { IMessageType } from './tcp.interface';

export class TcpService {
  private readonly client: ClientProxy;

  constructor(host: string, port: number) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port,
        host,
      },
    });
  }

  public send<K extends keyof IMessageType>(key: K, data: IMessageType[K][0]) {
    return this.client.send<IMessageType[K][2]>({ cmd: key }, data);
  }
}
