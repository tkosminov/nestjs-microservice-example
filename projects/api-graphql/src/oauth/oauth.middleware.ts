import { IJwtPayload } from '@micro/shared/types';
import { current_user } from '@micro/shared/development/current-user';
import { EExceptionType, accountBlocked, jwtTokenExpiredSignature, unauthorized } from '@micro/shared/errors';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { isJWT } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { getRequestHeader } from '../helpers/req.helper';

@Injectable()
export class OAuthMiddleware implements NestMiddleware {
  public async use(req: Request & { current_user?: IJwtPayload }, _res: Response, next: NextFunction) {
    if (
      req.body &&
      (req.body.operationName === 'IntrospectionQuery' ||
        (typeof req.body.query === 'string' && req.body.query.startsWith('query IntrospectionQuery')))
    ) {
      return next();
    }

    const token = getRequestHeader(req, 'authorization');

    if (!token?.length && process.env.NODE_ENV === 'development') {
      req.current_user = current_user!;

      return next();
    }

    if (token?.length) {
      if (isJWT(token)) {
        try {
          const payload = verify(token, process.env.JWT_SECRET) as IJwtPayload;

          if (payload.is_blocked) {
            return next(accountBlocked(EExceptionType.HTTP));
          }

          req.current_user = payload;

          return next();
        } catch (e) {
          return next(jwtTokenExpiredSignature(EExceptionType.HTTP));
        }
      }
    }

    return next(unauthorized(EExceptionType.HTTP));
  }
}
