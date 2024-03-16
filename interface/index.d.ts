export interface SessionCookie {
  user: { id: string; role: string; fullName: string };
}

export interface ServerActionResponse {
  success: boolean;
  errors: { message: string; path: [string] }[];
}

export type ServerAction<T> = {
  success: boolean;
  errors: { message: string; path: [T] }[];
};
