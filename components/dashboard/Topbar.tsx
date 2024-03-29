"use client";
import { Input } from "@/components";
import { MenuIcon, NotificationIcon, SearchIcon } from "@/components/icons";
import {
  DashboardContext,
  DashboardContextProps,
} from "@/contexts/DashboardProvider";
import { ServerActionContext } from "@/contexts/ServerActionContext";
import translate from "@/hooks/translate";
import { RefObject, useContext } from "react";
import LanguageButton from "../LanguageButton";
import UserButton from "../auth/UserButton";

export default function Topbar({
  triggerRef,
}: {
  triggerRef: RefObject<HTMLDivElement>;
}) {
  const t = translate();
  const { logout } = useContext(ServerActionContext);
  const { session } = useContext<DashboardContextProps>(DashboardContext);

  return (
    <div className="z-30 flex w-full items-center justify-between bg-white px-5 py-3 shadow">
      <div className="flex items-center justify-start gap-2">
        <div
          ref={triggerRef}
          className="w-max cursor-pointer rounded-lg bg-[var(--bg-light-gray)] p-2 shadow-sm lg:hidden"
        >
          <MenuIcon className="h-6 w-6 cursor-pointer" />
        </div>
        <LanguageButton />
      </div>
      <div className="flex items-center gap-4">
        <Input
          title=""
          type="text"
          icon={<SearchIcon className="h-6 w-6" color="rgb(174, 180, 190)" />}
          className="bg-[var(--bg-light-gray)]"
          placeholder={t("Search")}
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
  );
}
