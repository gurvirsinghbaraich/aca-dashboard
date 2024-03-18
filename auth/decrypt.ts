import { CookiePayload } from "@/auth";
import { jwtVerify } from "jose";

export default async function decrypt<T>(
  cookieValue: string,
  key: Uint8Array,
): Promise<CookiePayload & T> {
  const { payload } = await jwtVerify(cookieValue, key, {
    algorithms: ["HS256"],
  });

  return <CookiePayload & T>payload;
}
