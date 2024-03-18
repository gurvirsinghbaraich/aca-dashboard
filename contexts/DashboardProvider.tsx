"use client";
import { SessionCookie } from "@/interface";
import { Employee } from "@prisma/client";
import { createContext, useState } from "react";

export type DashboardContextProps = {
  locale: string;
  session: SessionCookie;
  recentlyAddedAgents: string;
  recentlyAddedCustomers: string;
  searchEmployeeResult: Pick<
    Employee,
    "id" | "username" | "email" | "phoneNumber"
  >[];
  setSearchEmployeeResult: (
    agent: Pick<Employee, "id" | "username" | "email" | "phoneNumber">[],
  ) => void;
};

const payload = {
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
  searchEmployeeResult: [],
  setSearchEmployeeResult: () => {},
};

export const DashboardContext = createContext<DashboardContextProps>(payload);

export default function DashboardProvider({
  value,
  children,
}: {
  children: React.ReactNode;
  value: Partial<DashboardContextProps>;
}) {
  const [searchEmployeeResult, setSearchEmployeeResult] = useState<
    Pick<Employee, "id" | "username" | "email" | "phoneNumber">[]
  >([]);

  return (
    <DashboardContext.Provider
      value={{
        ...payload,
        searchEmployeeResult,
        setSearchEmployeeResult,
        ...value,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
