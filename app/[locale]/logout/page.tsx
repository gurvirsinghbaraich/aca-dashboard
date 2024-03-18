import { logout } from "@/actions";
import { redirect } from "next/navigation";

export default async function logoutPage() {
  await logout();
  return redirect("/login");
}
