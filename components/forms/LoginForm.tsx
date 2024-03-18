"use client";
import { Button, Input } from "@/components";
import translate from "@/hooks/translate";
import useServerAction from "@/hooks/useServerAction";
import { ServerAction } from "@/interface";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

type FormErrors = {
  username: string | null;
  password: string | null;
};

export default function LoginForm({ loginAction }: { loginAction: any }) {
  const t = translate();
  const [errors, setErrors] = useState<FormErrors>({
    username: null,
    password: null,
  });

  const { serverAction, waitingForResponse } = useServerAction<
    ServerAction<keyof FormErrors>
  >(loginAction, (response) => {
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
  });

  return (
    <form action={serverAction} className="flex flex-col gap-6">
      <Input
        type="text"
        name="username"
        title={t("Username")}
        error={errors.username}
        placeholder="Ralph Adwards"
      />
      <Input
        type="password"
        name="password"
        title={t("Password")}
        placeholder="********"
        error={errors.password}
      />

      <Button
        title={t("Login")}
        loading={waitingForResponse}
        disabled={waitingForResponse}
      />

      {/* Forget Button */}
      <div className="flex justify-center gap-1 rounded bg-gray-200 bg-opacity-50 p-3 py-6 text-base text-gray-600">
        <p>{t("Forget your password?")}</p>
        <Link
          className="rounded font-medium text-gray-700 underline"
          href={"/reset-password"}
        >
          {t("Reset It")}
        </Link>
      </div>
    </form>
  );
}
