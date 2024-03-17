"use client";

import { ServerAction } from "@/interface";
import { redirect } from "next/navigation";
import { Button, Input } from "@/components";
import { useCallback, useState, useTransition } from "react";
import { getPath } from "@/roles";
import { LIST_AGENTS } from "@/routes";

type FormErrors = {
  name: string | null;
  email: string | null;
  fullName: string | null;
  address: string | null;
  phone: string | null;
  password: string | null;
};

export default function CreateAgentForm({
  createAgentAction,
}: {
  createAgentAction: any;
}) {
  const [waitingForResponse, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({
    address: null,
    email: null,
    fullName: null,
    name: null,
    password: null,
    phone: null,
  });

  const clientCreateAgentAction = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        const { success, errors }: ServerAction<keyof FormErrors> =
          await createAgentAction(formData);

        const latestErrors: FormErrors = {
          address: null,
          email: null,
          fullName: null,
          name: null,
          password: null,
          phone: null,
        };

        if (!success) {
          errors.map((error) => {
            latestErrors[error.path[0]] = error.message;
          });
        }

        setErrors(latestErrors);
        if (success) redirect(getPath("agent", LIST_AGENTS, "/"));
      });
    },
    [createAgentAction],
  );

  return (
    <form
      method="GET"
      action={clientCreateAgentAction}
      className="flex flex-col gap-3 rounded bg-white px-6 py-8 shadow-sm"
    >
      <div className="flex justify-evenly gap-4">
        <Input title="Name" name="name" type="text" error={errors.name} />
        <Input title="Email" name="email" type="email" error={errors.email} />
      </div>

      <div className="flex justify-evenly gap-4">
        <Input
          title="Full Name"
          name="fullName"
          type="text"
          error={errors.fullName}
        />
        <Input
          title="Address"
          name="address"
          type="text"
          error={errors.address}
        />
      </div>

      <div className="flex justify-evenly gap-4">
        <Input title="Phone" name="phone" type="text" error={errors.phone} />
        <Input
          title="Password"
          name="password"
          type="password"
          error={errors.password}
        />
      </div>

      <Button
        className="w-max"
        title="Create Agent"
        loading={waitingForResponse}
        disabled={waitingForResponse}
      />
    </form>
  );
}
