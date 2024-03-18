export interface SessionCookie {
  user: { id: string; role: string; fullName: string };
}

export interface ServerActionResponse {
  data?: any;
  success: boolean;
  errors: { message: string; path: [string] }[];
}

export type ServerAction<T> = Omit<ServerActionResponse, "errors"> & {
  errors: { message: string; path: [T] }[];
};
