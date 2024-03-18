"use client";
import { createContext } from "react";
import { SessionCookie } from "@/interface";

export type DashboardContextProps = {
  locale: string;
  session: SessionCookie;
  recentlyAddedAgents: string;
  recentlyAddedCustomers: string;
};

export const DashboardContext = createContext<DashboardContextProps>({
  locale: "en",
  recentlyAddedAgents: "0",
  recentlyAddedCustomers: "0",
  session: {
    user: {
      id: "",
      role: "",
      fullName: "",
    },
  },
});

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
