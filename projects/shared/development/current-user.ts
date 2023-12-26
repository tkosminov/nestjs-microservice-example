import { IJwtPayload } from '../types';

export const current_user: IJwtPayload | null =
  process.env.NODE_ENV === 'development'
    ? {
        iss: 'NestJS-Microservice-Example',
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000,
        jti: '1',

        id: '8ca15a66-c5eb-4779-903c-f35ec9715566',
        is_blocked: false,
        is_admin: true,
        login: 'dev_current_user',
      }
    : null;
