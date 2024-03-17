import { getSession } from "@/auth";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { SessionCookie } from "@/interface";
import { sanitizeRole } from "@/roles";

export default async function DashboardPage() {
  const session = await getSession<SessionCookie>();

  if (!session) {
    return null;
  }

  switch (sanitizeRole(session.user.role)) {
    case "admin": {
      return <AdminDashboard />;
    }
  }
}
