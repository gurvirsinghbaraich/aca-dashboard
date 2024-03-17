import { SessionCookie } from "@/interface";
import ClientSideUserButton from "@/components/auth/ClientSideUserButton";

export default async function UserButton({
  session,
  logout,
}: {
  session: SessionCookie;
  logout: any;
}) {
  return (
    <div className="relative flex items-center justify-center gap-2 rounded-full">
      <ClientSideUserButton logoutAction={logout} session={session} />
    </div>
  );
}
