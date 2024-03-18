"use client";
import React, { useContext } from "react";
import { Button } from "@/components";
import UserAvatar from "@/components/icons/UserAvatar";
import translate from "@/hooks/translate";
import { DashboardContext } from "@/contexts/DashboardProvider";
import { ServerActionContext } from "@/contexts/ServerActionContext";

const ClientSideUserButton = () => {
  const t = translate();
  const { session } = useContext(DashboardContext);
  const { logout } = useContext(ServerActionContext);
  const modelRef = React.useRef<HTMLDialogElement>(null);

  const toggleModel = React.useCallback(() => {
    if (!modelRef.current) return;

    !modelRef.current.checkVisibility()
      ? modelRef.current.show()
      : modelRef.current.close();
  }, [modelRef]);

  React.useEffect(
    function () {
      if (!modelRef.current) return;

      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          // Check if the dialog is open
          if (modelRef.current?.checkVisibility()) {
            modelRef.current?.close();
          }
        }
      });
    },
    [modelRef],
  );

  return (
    <>
      <div
        onClick={toggleModel}
        className="aspect-square w-10 cursor-pointer rounded-full hover:opacity-90"
      >
        <UserAvatar />
      </div>
      <dialog
        ref={modelRef}
        className="absolute -left-36 top-[110%] z-[1] p-3 shadow"
      >
        <div className="flex flex-col gap-1">
          <div className="w-screen max-w-36 overflow-hidden rounded-md">
            <div>
              <table className="capitalize">
                <thead className="text-sm font-semibold">
                  <tr>
                    <td>{t("Name:")}&nbsp;</td>
                    <td>{session.user.fullName}</td>
                  </tr>
                </thead>
                <tbody className="text-xs text-blue-500">
                  <tr>
                    <td>{t("Role:")}</td>
                    <td>{t(session.user.role)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="my-2 border-2 border-dotted py-2"></div>
          <form action={logout}>
            <Button className="py-2" title={t("Logout")} />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ClientSideUserButton;
