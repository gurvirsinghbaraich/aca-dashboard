"use client";
import useServerAction from "@/hooks/useServerAction";
import { ServerAction } from "@/interface";
import { useContext, useState } from "react";
import { Button, Input } from "..";
import { ServerActionContext } from "@/contexts/ServerActionContext";

type FormErrors = {
  search: string | null;
};

export default function SearchAgentForm() {
  const [response, setResponse] = useState<any[] | null>(null);
  const [errors, setErrors] = useState<FormErrors>({
    search: null,
  });

  const { searchAgent } = useContext(ServerActionContext);

  const { serverAction, waitingForResponse } = useServerAction<
    ServerAction<keyof FormErrors>
  >(searchAgent, (response) => {
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
    if (success) setResponse(data);
  });

  return (
    <form
      action={serverAction}
      className="flex flex-col gap-3 rounded bg-white px-6 py-8 shadow-sm"
    >
      {response}
      <Input title="Agent" name="search" type="text" error={errors.search} />
      <Button
        title="Search"
        loading={waitingForResponse}
        disabled={waitingForResponse}
      />
    </form>
  );
}
