import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { SessionCookie } from "@/interface";

export default async function Home() {
  const session = await getSession<SessionCookie>();

  if (!session) {
    return redirect("/login");
  }

  return redirect("/dashboard");
}
