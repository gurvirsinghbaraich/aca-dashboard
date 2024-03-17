"use client";
import { useRef } from "react";
import { SessionCookie } from "@/interface";
import Topbar from "@/components/dashboard/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Dashboard({
  session,
  children,
}: Readonly<{ children: React.ReactNode; session: SessionCookie }>) {
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="grid h-screen w-screen grid-cols-1 grid-rows-1 bg-gray-100 lg:grid-cols-[280px_1fr]">
      <Sidebar session={session} triggerRef={triggerRef} />
      <div>
        <Topbar triggerRef={triggerRef} />
        <div className="p-4">{children}</div>
      </div>
    </main>
  );
}
