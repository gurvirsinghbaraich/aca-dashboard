import { getSession } from "@/auth";
import { Input } from "@/components";
import PopulateSiderbarLinks from "@/components/PopulateSidebarLinks";
import UserButton from "@/components/auth/UserButton";
import {
  LanguageIcon,
  MenuIcon,
  NotificationIcon,
  SearchIcon,
} from "@/components/icons";
import { SessionCookie } from "@/interface";
import { hasLinksToRender, isSuperiorOrEqual, sanitizeRole } from "@/roles";
import { sidebarLinks } from "@/routes";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession<SessionCookie>();

  if (!session) {
    return redirect("/");
  }

  return (
    <main className="grid h-screen w-screen grid-cols-1 grid-rows-1 bg-gray-100 lg:grid-cols-[280px_1fr]">
      <div className="hidden h-full grid-rows-[70px_1fr] bg-[var(--sidebar-background)] text-white lg:grid">
        <div></div>
        <div className="flex flex-col gap-4 px-4">
          {/* Admin Links */}
          <div>
            {isSuperiorOrEqual(sanitizeRole(session.user.role), "admin") && (
              <div className="py-4 text-sm font-semibold uppercase">Admin</div>
            )}
            <PopulateSiderbarLinks
              userRole={sanitizeRole(session.user.role)}
              links={sidebarLinks.admin}
            />
          </div>

          {/* Agent Links */}
          <div>
            {isSuperiorOrEqual(sanitizeRole(session.user.role), "agent") &&
              hasLinksToRender(sanitizeRole(session.user.role), "agent") && (
                <div className="py-4 text-sm font-semibold uppercase">
                  Agent
                </div>
              )}
            <PopulateSiderbarLinks
              userRole={sanitizeRole(session.user.role)}
              links={sidebarLinks.agent}
            />
          </div>

          {/* Staff Links */}

          {/* Customer Links */}
          <div>
            {isSuperiorOrEqual(sanitizeRole(session.user.role), "customer") &&
              hasLinksToRender(sanitizeRole(session.user.role), "customer") && (
                <div className="py-4 text-sm font-semibold uppercase">
                  Customer
                </div>
              )}
            <PopulateSiderbarLinks
              userRole={sanitizeRole(session.user.role)}
              links={sidebarLinks.customer}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex w-full items-center justify-between bg-white px-5 py-3 shadow">
          <div className="flex items-center justify-start gap-2">
            <div className="w-max cursor-pointer rounded-lg bg-[var(--bg-light-gray)] p-2 shadow-sm lg:hidden">
              <MenuIcon className="h-6 w-6 cursor-pointer" />
            </div>
            <LanguageIcon className="h-6 w-6 cursor-pointer" />
          </div>
          <div className="flex items-center gap-4">
            <Input
              title=""
              type="text"
              icon={
                <SearchIcon className="h-6 w-6" color="rgb(174, 180, 190)" />
              }
              className="bg-[var(--bg-light-gray)]"
              placeholder="Search"
            />
            <div>
              <div className="relative cursor-pointer p-0.5">
                <span className="absolute right-0 top-0 aspect-square w-2 rounded-full bg-[rgb(15_52_96)]"></span>
                <NotificationIcon className="h-6 w-6 fill-gray-400" />
              </div>
            </div>

            <UserButton />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
