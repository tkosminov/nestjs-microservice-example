export interface IJwtPayload {
  readonly iss: string; // app name
  readonly iat: number; // jwt created at
  readonly exp: number; // jwt expires at
  readonly jti: string; // jwt id

  readonly id: string; // user id
  readonly login: string;
  readonly is_admin: boolean;
  readonly is_blocked: boolean;
}

export type TPartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
