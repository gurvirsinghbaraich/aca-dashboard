"use client";

import { Button, Input } from "@/components";
import useServerAction from "@/hooks/useServerAction";
import { ServerAction } from "@/interface";
import { useRef, useState } from "react";

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
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FormErrors>({
    address: null,
    email: null,
    fullName: null,
    name: null,
    password: null,
    phone: null,
  });

  const { serverAction, waitingForResponse } = useServerAction<
    ServerAction<keyof FormErrors>
  >(createAgentAction, (response) => {
    const { success, errors } = response;

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
    if (success) formRef.current?.reset();
  });
  return (
    <form
      ref={formRef}
      action={serverAction}
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
