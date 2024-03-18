import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { SessionCookie } from "@/interface";
import Dashboard from "@/components/dashboard/Dashboard";
import { logout } from "@/actions";
import DashboardProvider from "@/contexts/DashboardProvider";
import { Role } from "@/roles";
import getDatabase from "@/auth/providers/prisma";
import moment from "moment";
import { ServerActionProvider } from "@/contexts/ServerActionContext";
import searchAgent from "@/actions/searchAgent";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession<SessionCookie>();

  if (!session) {
    return redirect("/");
  }

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
      value={{ session, recentlyAddedAgents, recentlyAddedCustomers }}
    >
      <ServerActionProvider value={{ searchAgent, logout }}>
        <Dashboard>{children}</Dashboard>
      </ServerActionProvider>
    </DashboardProvider>
  );
}
