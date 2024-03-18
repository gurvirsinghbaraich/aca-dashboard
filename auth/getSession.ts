import { CookiePayload, decryptSession } from "@/auth";
import { cookies } from "next/headers";

export default function getSession<T>(): Promise<CookiePayload & T> | null {
  // Getting the session from the cookies
  const session = cookies().get("session")?.value;

  // If there is no session, return null
  if (!session) {
    return null;
  }

  try {
    return decryptSession(session);
  } catch (error: any) {
    return null;
  }
}
