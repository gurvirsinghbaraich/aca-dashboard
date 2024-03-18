"use client";
import { createContext } from "react";

type Action = (formData: FormData) => void;

type ServerActionContextValue = {
  logout: Action;
  searchEmployee: Action;
};

export const ServerActionContext = createContext<ServerActionContextValue>({
  logout: () => {},
  searchEmployee: () => {},
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
