import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user/user.entity';

const repositories = TypeOrmModule.forFeature([User]);

@Global()
@Module({
  imports: [repositories],
  providers: [],
  exports: [repositories],
})
export class ModelsModule {}
