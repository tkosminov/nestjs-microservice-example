import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { GraphQLError } from 'graphql';

export enum EExceptionType {
  COMMON = 1,
  HTTP = 2,
  RPC = 3,
  GRAPHQL = 4,
}

export function baseException(message: string, code: number, exception_type?: EExceptionType) {
  exception_type ||= EExceptionType.COMMON;

  switch (exception_type) {
    case EExceptionType.HTTP:
      return new HttpException(message, code);
    case EExceptionType.RPC:
      return new RpcException(message);
    case EExceptionType.GRAPHQL:
      return new GraphQLError(message);
    default:
      return new Error(message);
  }
}

export function authorizationFailed(exception_type?: EExceptionType): Error;
export function authorizationFailed(message?: string, exception_type?: EExceptionType): Error;
export function authorizationFailed(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'AUTHORIZATION_FAILED';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.BAD_REQUEST, exception_type);
}

export function unauthorized(exception_type?: EExceptionType): Error;
export function unauthorized(message?: string, exception_type?: EExceptionType): Error;
export function unauthorized(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'UNAUTHORIZED';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.UNAUTHORIZED, exception_type);
}

export function jwtTokenExpiredSignature(exception_type?: EExceptionType): Error;
export function jwtTokenExpiredSignature(message?: string, exception_type?: EExceptionType): Error;
export function jwtTokenExpiredSignature(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'JWT_TOKEN_EXPIRED';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.FORBIDDEN, exception_type);
}

export function refreshTokenExpiredSignature(exception_type?: EExceptionType): Error;
export function refreshTokenExpiredSignature(message?: string, exception_type?: EExceptionType): Error;
export function refreshTokenExpiredSignature(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'REFRESH_TOKEN_EXPIRED';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, 419, exception_type);
}

export function accessDenied(exception_type?: EExceptionType): Error;
export function accessDenied(message?: string, exception_type?: EExceptionType): Error;
export function accessDenied(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'ACCESS_DENIED';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.FORBIDDEN, exception_type);
}

export function accountBlocked(exception_type?: EExceptionType): Error;
export function accountBlocked(message?: string, exception_type?: EExceptionType): Error;
export function accountBlocked(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'ACCOUNT_BLOCKED';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, 423, exception_type);
}

export function badRequest(exception_type?: EExceptionType): Error;
export function badRequest(message?: string, exception_type?: EExceptionType): Error;
export function badRequest(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'BAD_REQUEST';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.BAD_REQUEST, exception_type);
}

export function notFound(exception_type?: EExceptionType): Error;
export function notFound(message?: string, exception_type?: EExceptionType): Error;
export function notFound(message_or_exception_type?: string | EExceptionType, exception_type?: EExceptionType): Error {
  let message: string = 'NOT_FOUND';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.NOT_FOUND, exception_type);
}

export function internalServerError(exception_type?: EExceptionType): Error;
export function internalServerError(message?: string, exception_type?: EExceptionType): Error;
export function internalServerError(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'INTERNAL_SERVER_ERROR';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.INTERNAL_SERVER_ERROR, exception_type);
}

export function serviceUnavailable(exception_type?: EExceptionType): Error;
export function serviceUnavailable(message?: string, exception_type?: EExceptionType): Error;
export function serviceUnavailable(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'SERVICE_UNAVAILABLE';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.SERVICE_UNAVAILABLE, exception_type);
}

export function corsNotAllowed(exception_type?: EExceptionType): Error;
export function corsNotAllowed(message?: string, exception_type?: EExceptionType): Error;
export function corsNotAllowed(
  message_or_exception_type?: string | EExceptionType,
  exception_type?: EExceptionType
): Error {
  let message: string = 'CORS_NOT_ALLOWED';

  if (message_or_exception_type) {
    if (message_or_exception_type in EExceptionType) {
      exception_type = message_or_exception_type as EExceptionType;
    } else {
      message = message_or_exception_type as string;
    }
  }

  return baseException(message, HttpStatus.BAD_REQUEST, exception_type);
}
