import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { SessionCookie } from "@/interface";
import Dashboard from "@/components/dashboard/Dashboard";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession<SessionCookie>();

  if (!session) {
    return redirect("/");
  }

  return <Dashboard session={session}>{children}</Dashboard>;
}
