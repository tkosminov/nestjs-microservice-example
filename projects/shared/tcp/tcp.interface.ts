import { LoggerStore } from '../logger/logger.store';
import { IJwtPayload } from '../types';
import { User } from '../models/user/user.entity';
import { UserCreateDTO } from '../models/user/dto/create.dto';
import { UserDeleteDTO } from '../models/user/dto/delete.dto';
import { UserUpdateDTO } from '../models/user/dto/update.dto';

export interface IOutgoingMessageData<T> {
  request_id: string;
  current_user: IJwtPayload;
  data: T;
}

export interface IIncomingMessageData<T> extends IOutgoingMessageData<T> {
  logger_store?: LoggerStore;
}

export enum EMessagePattern {
  user_create = 'user_create',
  user_update = 'user_update',
  user_delete = 'user_delete',
}

export interface IMessageType {
  [EMessagePattern.user_create]: [IOutgoingMessageData<UserCreateDTO>, IIncomingMessageData<UserCreateDTO>, User];
  [EMessagePattern.user_update]: [IOutgoingMessageData<UserUpdateDTO>, IIncomingMessageData<UserUpdateDTO>, User];
  [EMessagePattern.user_delete]: [IOutgoingMessageData<UserDeleteDTO>, IIncomingMessageData<UserDeleteDTO>, User];
}
