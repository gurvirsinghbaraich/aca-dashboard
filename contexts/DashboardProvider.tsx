"use client";
import { createContext } from "react";
import { SessionCookie } from "@/interface";

export type DashboardContextProps = {
  session: SessionCookie;
  recentlyAddedAgents: string;
  recentlyAddedCustomers: string;
};

export const DashboardContext = createContext<any>({});

export default function DashboardProvider({
  value,
  children,
}: {
  children: React.ReactNode;
  value: DashboardContextProps;
}) {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
