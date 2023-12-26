import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule, Test } from '@nestjs/testing';
import { User } from '@micro/shared/models/user/user.entity';
import { v4_mock, date_mock } from '@micro/shared/jest/global.jest.spec';
import {
  deleteMock,
  findOneOrFailMock,
  insertQueryBuilderMock,
  updateQueryBuilderMock,
} from '@micro/shared/jest/typeorm.jest.spec';
import { UserCreateDTO } from '@micro/shared/models/user/dto/create.dto';
import { UserUpdateDTO } from '@micro/shared/models/user/dto/update.dto';
import { UserDeleteDTO } from '@micro/shared/models/user/dto/delete.dto';
import { Repository } from 'typeorm';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const user_repository_token = getRepositoryToken(User);
  let user_repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: user_repository_token,
          useClass: Repository,
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    user_repository = module.get<Repository<User>>(user_repository_token);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(user_repository).toBeDefined();
  });

  it('should be created', async () => {
    const data: UserCreateDTO = {
      full_name: 'Test 1',
    };

    const created_user: User = {
      id: v4_mock,
      full_name: data.full_name,
      created_at: date_mock,
      updated_at: date_mock,
    };

    const user_insert_mock = insertQueryBuilderMock(user_repository, [created_user]);

    expect(await service.create(data)).toEqual(created_user);

    expect(user_insert_mock.values).toHaveBeenCalledWith(data);
    expect(user_insert_mock.returning).toHaveBeenCalledWith('*');
  });

  it('should be updated', async () => {
    const data: UserUpdateDTO = {
      id: v4_mock,
      full_name: 'Test 2',
    };

    const updated_user: User = {
      id: data.id,
      full_name: data.full_name,
      created_at: date_mock,
      updated_at: date_mock,
    };

    const user_update_mock = updateQueryBuilderMock(user_repository, [updated_user]);

    expect(await service.update(data)).toEqual(updated_user);

    expect(user_update_mock.set).toHaveBeenCalledWith(data);
    expect(user_update_mock.where).toHaveBeenCalledWith({ id: data.id });
    expect(user_update_mock.returning).toHaveBeenCalledWith('*');
  });

  it('should be deleted', async () => {
    const data: UserDeleteDTO = {
      id: v4_mock,
    };

    const deleted_user: User = {
      id: data.id,
      full_name: 'Test 1',
      created_at: date_mock,
      updated_at: date_mock,
    };

    const user_find_one_or_fail_mock = findOneOrFailMock(user_repository, deleted_user);
    const user_delete_mock = deleteMock(user_repository);

    expect(await service.delete(data)).toEqual(deleted_user);

    expect(user_find_one_or_fail_mock.findOneOrFail).toHaveBeenCalledWith({
      where: { id: data.id },
    });
    expect(user_delete_mock.delete).toHaveBeenCalledWith(data.id);
  });
});
