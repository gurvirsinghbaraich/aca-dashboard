import { cookies } from "next/headers";

export default async function logout() {
  "use server";

  // Destory the session
  cookies().set("session", "", {
    expires: new Date(0),
  });
}
