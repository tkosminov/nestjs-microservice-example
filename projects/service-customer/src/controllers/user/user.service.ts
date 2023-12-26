import { UserCreateDTO } from '@micro/shared/models/user/dto/create.dto';
import { UserDeleteDTO } from '@micro/shared/models/user/dto/delete.dto';
import { UserUpdateDTO } from '@micro/shared/models/user/dto/update.dto';
import { User } from '@micro/shared/models/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user_repository: Repository<User>) {}

  public async create(data: UserCreateDTO) {
    const {
      raw: [user],
    }: { raw: [User] } = await this.user_repository.createQueryBuilder().insert().values(data).returning('*').execute();

    return user;
  }

  public async update(data: UserUpdateDTO) {
    const {
      raw: [user],
    }: { raw: [User] } = await this.user_repository
      .createQueryBuilder()
      .update()
      .set({ ...data })
      .where({
        id: data.id,
      })
      .returning('*')
      .execute();

    return user;
  }

  public async delete(data: UserDeleteDTO) {
    const user = await this.user_repository.findOneOrFail({
      where: { id: data.id },
    });

    await this.user_repository.delete(user.id);

    return user;
  }
}
