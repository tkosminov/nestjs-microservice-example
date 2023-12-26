import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { HealthzController } from './healthz.controller';

@Module({
  imports: [TerminusModule],
  providers: [],
  controllers: [HealthzController],
  exports: [],
})
export class HealthzModule {}
