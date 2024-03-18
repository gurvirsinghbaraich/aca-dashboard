import { logout } from "@/actions";
import searchEmployee from "@/actions/searchEmployee";
import { getSession } from "@/auth";
import getDatabase from "@/auth/providers/prisma";
import Dashboard from "@/components/dashboard/Dashboard";
import DashboardProvider from "@/contexts/DashboardProvider";
import { ServerActionProvider } from "@/contexts/ServerActionContext";
import { SessionCookie } from "@/interface";
import { Role } from "@/roles";
import moment from "moment";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession<SessionCookie>();

  if (!session) {
    return redirect("/");
  }

  const locale = await getLocale();

  const getCount = async (role: Role) => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumIntegerDigits: 2,
    }).format;

    const { _count } = await getDatabase().employee.aggregate({
      _count: true,
      where: {
        role: role,
        createdAt: {
          gte: moment()
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .toISOString(),
        },
      },
    });

    return formatter(_count);
  };

  const recentlyAddedAgents = await getCount("agent");
  const recentlyAddedCustomers = await getCount("customer");

  return (
    <DashboardProvider
      value={{
        session,
        locale,
        recentlyAddedAgents,
        recentlyAddedCustomers,
      }}
    >
      <ServerActionProvider value={{ searchEmployee, logout }}>
        <Dashboard>{children}</Dashboard>
      </ServerActionProvider>
    </DashboardProvider>
  );
}

export const metadata = {
  title: "Aca Dashboard",
};
