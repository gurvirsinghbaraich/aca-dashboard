import useServerAction from "@/hooks/useServerAction";
import { ServerAction } from "@/interface";
import { useContext, useState } from "react";
import { Button, Input } from "..";
import { ServerActionContext } from "@/contexts/ServerActionContext";
import translate from "@/hooks/translate";
import { SearchIcon } from "../icons";
import { Employee } from "@prisma/client";
import { DashboardContext } from "@/contexts/DashboardProvider";
import { capitalize } from "@/lib/capitalize";
import { Role } from "@/roles";

type FormErrors = {
  search: string | null;
};

export default function SearchEmployeeForm({ role }: { role: Role }) {
  const t = translate();
  const [errors, setErrors] = useState<FormErrors>({
    search: null,
  });
  const { searchEmployee } = useContext(ServerActionContext);
  const { setSearchEmployeeResult } = useContext(DashboardContext);

  const { serverAction, waitingForResponse } = useServerAction<
    ServerAction<
      keyof FormErrors,
      Pick<Employee, "id" | "username" | "email" | "phoneNumber">[]
    >
  >(searchEmployee, (response) => {
    const { success, errors, data } = response;

    const latestErrors: FormErrors = {
      search: null,
    };

    if (!success) {
      errors.map((error) => {
        latestErrors[error.path[0]] = error.message;
      });
    }

    setErrors(latestErrors);
    if (success) {
      if (data) {
        setSearchEmployeeResult(data);
      }
    }
  });

  if (!role) return;

  return (
    <form
      action={serverAction}
      className="flex gap-3 rounded bg-white px-6 py-8 shadow-sm"
    >
      <Input
        autoFocus
        type="text"
        name="search"
        title=""
        error={errors.search}
        placeholder={t(`Search ${capitalize(role)}`)}
        className="bg-[var(--bg-light-gray)]"
        icon={<SearchIcon className="h-6 w-6" color="rgb(174, 180, 190)" />}
      />
      <div className="hidden">
        <Input readOnly value={role} name="role" title="" hidden={true} />
      </div>
      <Button
        className="mt-1 max-h-[50px]"
        title={t("Search")}
        loading={waitingForResponse}
        disabled={waitingForResponse}
      />
      <Button
        className="mt-1 max-h-[50px]"
        title={t(`Add ${capitalize(role)}`)}
        loading={waitingForResponse}
        disabled={waitingForResponse}
      />
    </form>
  );
}
