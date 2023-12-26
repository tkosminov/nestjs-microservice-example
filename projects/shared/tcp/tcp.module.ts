import { Global, Module } from '@nestjs/common';

import { tcp_providers } from './tcp.providers';

@Global()
@Module({
  providers: tcp_providers,
  exports: tcp_providers,
})
export class TcpModule {}
