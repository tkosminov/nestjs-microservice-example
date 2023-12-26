import { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { corsNotAllowed } from '@micro/shared/errors';

import { Request } from 'express';

import { getOrigin, getPath, getMethod } from './helpers/req.helper';

const allowed_methods = process.env.CORS_ALLOWED_METHODS ? JSON.parse(process.env.CORS_ALLOWED_METHODS) : [];
const allowed_origins = process.env.CORS_ALLOWED_ORIGINS ? JSON.parse(process.env.CORS_ALLOWED_ORIGINS) : [];
const allowed_paths = process.env.CORS_ALLOWED_PATHS ? JSON.parse(process.env.CORS_ALLOWED_PATHS) : [];
const credentials = process.env.CORS_CREDENTIALS != null ? JSON.parse(process.env.CORS_CREDENTIALS) : false;

export const corsOptionsDelegate: CorsOptionsDelegate<Request> = (
  req,
  cb: (err: Error, options: CorsOptions) => void
) => {
  const cors_options: CorsOptions = {
    methods: allowed_methods,
    credentials,
    origin: false,
  };

  let error: Error | null = corsNotAllowed();

  const origin = getOrigin(req);
  const url = getPath(req);
  const method = getMethod(req);

  if (
    (!allowed_methods.length || allowed_methods.indexOf(method) !== -1) &&
    (!origin || !allowed_origins.length || allowed_origins.indexOf(origin) !== -1) &&
    (!allowed_paths.length || allowed_paths.indexOf(url) !== -1)
  ) {
    cors_options.origin = true;
    error = null;
  }

  cb(error!, cors_options);
};
