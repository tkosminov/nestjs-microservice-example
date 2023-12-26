import { Controller } from '@nestjs/common';
import { EMessagePattern, IIncomingMessageData } from '@micro/shared/tcp/tcp.interface';
import { CustomMessagePattern } from '@micro/shared/tcp/tcp.decorator';
import { UserCreateDTO } from '@micro/shared/models/user/dto/create.dto';
import { UserUpdateDTO } from '@micro/shared/models/user/dto/update.dto';
import { UserDeleteDTO } from '@micro/shared/models/user/dto/delete.dto';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @CustomMessagePattern(EMessagePattern.user_create)
  protected async create({ data }: IIncomingMessageData<UserCreateDTO>) {
    return this.user_service.create(data);
  }

  @CustomMessagePattern(EMessagePattern.user_update)
  protected async update({ data }: IIncomingMessageData<UserUpdateDTO>) {
    return this.user_service.update(data);
  }

  @CustomMessagePattern(EMessagePattern.user_delete)
  protected async import({ data }: IIncomingMessageData<UserDeleteDTO>) {
    return this.user_service.delete(data);
  }
}
