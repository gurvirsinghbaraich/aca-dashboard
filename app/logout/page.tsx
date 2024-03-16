import { logout } from "@/actions";
import { redirect } from "next/navigation";

export default async function logoutPage() {
  logout();
  return redirect("/login");
}
