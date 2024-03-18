"use client";
import { RefObject, useContext } from "react";
import { Input } from "@/components";
import {
  LanguageIcon,
  MenuIcon,
  NotificationIcon,
  SearchIcon,
} from "@/components/icons";
import UserButton from "../auth/UserButton";
import {
  DashboardContext,
  DashboardContextProps,
} from "@/contexts/DashboardProvider";
import { ServerActionContext } from "@/contexts/ServerActionContext";

export default function Topbar({
  triggerRef,
}: {
  triggerRef: RefObject<HTMLDivElement>;
}) {
  const { logout } = useContext(ServerActionContext);
  const { session } = useContext<DashboardContextProps>(DashboardContext);

  return (
    <div className="flex w-full items-center justify-between bg-white px-5 py-3 shadow">
      <div className="flex items-center justify-start gap-2">
        <div
          ref={triggerRef}
          className="w-max cursor-pointer rounded-lg bg-[var(--bg-light-gray)] p-2 shadow-sm lg:hidden"
        >
          <MenuIcon className="h-6 w-6 cursor-pointer" />
        </div>
        <LanguageIcon className="h-6 w-6 cursor-pointer" />
      </div>
      <div className="flex items-center gap-4">
        <Input
          title=""
          type="text"
          icon={<SearchIcon className="h-6 w-6" color="rgb(174, 180, 190)" />}
          className="bg-[var(--bg-light-gray)]"
          placeholder="Search"
        />
        <div>
          <div className="relative cursor-pointer p-0.5">
            <span className="absolute right-0 top-0 aspect-square w-2 rounded-full bg-[rgb(15_52_96)]"></span>
            <NotificationIcon className="h-6 w-6 fill-gray-400" />
          </div>
        </div>

        <UserButton session={session} logout={logout} />
      </div>
    </div>
  );
}
