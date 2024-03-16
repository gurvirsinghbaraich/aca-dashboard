import { DashboardIcon, UserCogIcon } from "@/components/icons";
import { Role, SidebarLinks, getLevel, isSuperiorOrEqual } from "@/roles";

export const ADMIN_DASHBOARD = "ADMIN_DASHBOARD";
export const CREATE_AGENT = "CREATE_AGENT";
export const LIST_AGENTS = "LIST_AGENTS";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const LIST_CUSTOMERS = "LIST_CUSTOMERS";

const canViewBase = (than: Role) => (role: Role) =>
  isSuperiorOrEqual(role, than);

const canViewBaseStrict = (than: Role) => (role: Role) =>
  getLevel(role) === getLevel(than);

const canViewAdmin = canViewBase("admin");
const canViewAgent = canViewBase("agent");
const canViewStaff = canViewBase("staff");
const canViewCustomer = canViewBase("customer");

const canViewAgentStrict = canViewBaseStrict("agent");
const canViewStaffStrict = canViewBaseStrict("staff");

export const sidebarLinks: SidebarLinks = {
  admin: [
    {
      label: "Dashboard",
      id: ADMIN_DASHBOARD,
      canView: canViewAdmin,
      icon: <DashboardIcon />,
      path: "/dashboard/admin",
    },
  ],
  agent: [
    {
      id: LIST_AGENTS,
      label: "List Agents",
      canView: canViewAdmin,
      icon: <UserCogIcon />,
      path: "/dashboard/agents",
    },
    {
      id: CREATE_AGENT,
      canView: canViewAdmin,
      icon: <UserCogIcon />,
      label: "Create Agent",
      path: "/dashboard/agents/create",
    },
  ],
  customer: [
    {
      id: LIST_CUSTOMERS,
      label: "List Customers",
      canView: canViewCustomer,
      icon: <UserCogIcon />,
      path: "/dashboard/customers",
    },
    {
      id: CREATE_CUSTOMER,
      canView: canViewCustomer,
      icon: <UserCogIcon />,
      label: "Create Customer",
      path: "/dashboard/customers/create",
    },
  ],
};
