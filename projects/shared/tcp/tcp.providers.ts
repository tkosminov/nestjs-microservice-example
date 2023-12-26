import { Provider } from '@nestjs/common';

import { TcpService } from './tcp.service';

export const SERVICE_NAMES: string[] = process.env.SERVICE_NAMES ? JSON.parse(process.env.SERVICE_NAMES) : [];

export const tcp_providers: Provider[] = [];

SERVICE_NAMES.forEach((name) => {
  const service_name = process.env[`SERVICE_${name}_NAME`];
  const service_host = process.env[`SERVICE_${name}_HOST`];
  const service_port = process.env[`SERVICE_${name}_PORT`];

  if (service_name && service_port && service_host) {
    tcp_providers.push({
      provide: service_name,
      useFactory: () => new TcpService(service_host, parseInt(service_port, 10)),
    });
  }
});
