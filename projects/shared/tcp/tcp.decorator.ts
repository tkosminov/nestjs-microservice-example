import { MessagePattern as NestJSMessagePattern } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

import { IMessageType } from './tcp.interface';

export function CustomMessagePattern<K extends keyof IMessageType>(cmd: K) {
  return function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    property_key: string,
    descriptor: TypedPropertyDescriptor<(data: IMessageType[K][1]) => Promise<IMessageType[K][2]>>
  ) {
    return NestJSMessagePattern({ cmd }, Transport.TCP)(target, property_key, descriptor);
  };
}
