"use client";
import React from "react";
import { Button } from "@/components";
import { SessionCookie } from "@/interface";
import UserAvatar from "@/components/icons/UserAvatar";

const ClientSideUserButton = ({
  session,
  logoutAction,
}: {
  session: SessionCookie;
  logoutAction: () => void;
}) => {
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
      <dialog ref={modelRef} className="absolute -left-36 top-[110%] p-3">
        <div className="flex flex-col gap-1">
          <div className="w-screen max-w-36 overflow-hidden rounded-md">
            <div>
              <table className="capitalize">
                <thead className="text-sm font-semibold">
                  <tr>
                    <td>Name:&nbsp;</td>
                    <td>{session.user.fullName}</td>
                  </tr>
                </thead>
                <tbody className="text-xs text-blue-500">
                  <tr>
                    <td>Role:</td>
                    <td>{session.user.role}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="my-2 border-2 border-dotted py-2"></div>
          <form action={logoutAction}>
            <Button className="py-2" title="Logout" />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ClientSideUserButton;
