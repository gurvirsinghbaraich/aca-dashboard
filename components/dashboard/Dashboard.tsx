"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import { useRef } from "react";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="grid h-screen w-full grid-cols-1 grid-rows-1 overflow-x-hidden bg-gray-100 lg:grid-cols-[280px_1fr]">
      <Sidebar triggerRef={triggerRef} />
      <div>
        <Topbar triggerRef={triggerRef} />
        <div className="p-4">{children}</div>
      </div>
    </main>
  );
}
