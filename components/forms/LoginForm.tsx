"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button, Input } from "@/components";
import { useCallback, useState, useTransition } from "react";
import { ServerAction } from "@/interface";

type FormErrors = {
  username: string | null;
  password: string | null;
};

export default function LoginForm({ loginAction }: { loginAction: any }) {
  const [waitingForResponse, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({
    username: null,
    password: null,
  });

  const clientLoginAction = useCallback(
    (formData: FormData) => {
      startTransition(async () => {
        const response: ServerAction<keyof FormErrors> =
          await loginAction(formData);

        if (response) {
          const { success, errors } = response;

          const latestErrors: FormErrors = {
            username: null,
            password: null,
          };

          if (!success) {
            errors.map((error) => {
              latestErrors[error.path[0]] = error.message;
            });
          }

          setErrors(latestErrors);
          if (success) redirect("/");
        }
      });
    },
    [loginAction],
  );

  return (
    <form action={clientLoginAction} className="flex flex-col gap-6">
      <Input
        type="text"
        name="username"
        title="UserName"
        error={errors.username}
        placeholder="Ralph Adwards"
      />
      <Input
        type="password"
        name="password"
        title="Password"
        placeholder="********"
        error={errors.password}
      />

      <Button
        title="Login"
        loading={waitingForResponse}
        disabled={waitingForResponse}
      />

      {/* Forget Button */}
      <div className="flex justify-center gap-1 rounded bg-gray-200 bg-opacity-50 p-3 py-6 text-base text-gray-600">
        <p>Forget your password?</p>
        <Link
          className="rounded font-medium text-gray-700 underline"
          href={"/reset-password"}
        >
          Reset It
        </Link>
      </div>
    </form>
  );
}
