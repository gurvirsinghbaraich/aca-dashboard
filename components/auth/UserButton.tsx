import { logout } from "@/actions";
import { getSession } from "@/auth";
import { SessionCookie } from "@/interface";
import ClientSideUserButton from "@/components/auth/ClientSideUserButton";

export default async function UserButton() {
  const session = await getSession<SessionCookie>();

  if (!session) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-center gap-2 rounded-full">
      <ClientSideUserButton logoutAction={logout} session={session} />
    </div>
  );
}
