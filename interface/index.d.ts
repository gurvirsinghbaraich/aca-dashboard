export interface SessionCookie {
  user: { id: string; role: string; fullName: string };
}

export interface ServerActionResponse<T = any> {
  data?: T;
  success: boolean;
  errors: { message: string; path: [string] }[];
}

export type ServerAction<S, T = any> = Omit<
  ServerActionResponse<T>,
  "errors"
> & {
  errors: { message: string; path: [S] }[];
};
