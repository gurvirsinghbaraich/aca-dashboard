import { logout } from "@/actions";
import { cookies } from "next/headers";
import { CookiePayload, decryptSession } from "@/auth";

export default function getSession<T>(): Promise<CookiePayload & T> | null {
  // Getting the session from the cookies
  const session = cookies().get("session")?.value;

  // If there is no session, return null
  if (!session) {
    return null;
  }

  // TODO: Implement the logic to check if the session is valid or not!
  try {
    return decryptSession(session);
  } catch (error: any) {
    logout();
    return null;
  }
}
