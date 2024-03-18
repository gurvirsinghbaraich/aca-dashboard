import { getSession } from "@/auth";
import { SessionCookie } from "@/interface";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const locale = await getLocale();
  const session = await getSession<SessionCookie>();

  if (!session) {
    return redirect(`/${locale}/login`);
  }

  return redirect(`/${locale}/dashboard`);
}
