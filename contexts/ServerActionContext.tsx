"use client";
import { createContext } from "react";

type Action = (formData: FormData) => void;

type ServerActionContextValue = {
  logout: Action;
  searchAgent: Action;
};

export const ServerActionContext = createContext<ServerActionContextValue>({
  logout: () => {},
  searchAgent: () => {},
});

export const ServerActionProvider = ({
  value,
  children,
}: {
  children: React.ReactNode;
  value: ServerActionContextValue;
}) => {
  return (
    <ServerActionContext.Provider value={value}>
      {children}
    </ServerActionContext.Provider>
  );
};
