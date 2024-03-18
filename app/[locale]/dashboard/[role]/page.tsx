"use client";
import { Role } from "@/roles";
import translate from "@/hooks/translate";
import { redirect } from "next/navigation";
import { useTitle } from "@/hooks/useTitle";
import { capitalize } from "@/lib/capitalize";
import SearchEmployeeForm from "@/components/forms/SearchEmployeeForm";

export default function ListEmployeePage({
  params,
}: {
  params: { role: Role };
}) {
  const role = params.role.substring(0, params.role.length - 1);

  if (!["agent", "customer"].includes(role)) {
    return redirect("/");
  }

  useTitle(`List ${capitalize(role!)} - Aca Dashboard`);
  const t = translate();

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{t(`All ${capitalize(role!)}`)}</h2>

        {/* CreateAgent Form */}
        <SearchEmployeeForm role={role as Role} />
      </section>
    </>
  );
}
