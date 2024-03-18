"use client";

import { useCallback, useState, useTransition } from "react";

export default function useServerAction<ServerActionResponse>(
  serverAction: any,
  callback?: (response: ServerActionResponse) => void,
) {
  const [waitingForResponse, startTransition] = useTransition();
  const [response, setResponse] = useState<ServerActionResponse | null>(null);

  const serverActionAction = useCallback(
    async (formData: FormData) => {
      startTransition(async () => {
        const response: ServerActionResponse = await serverAction(formData);

        if (response) {
          callback?.(response);
          setResponse(response);
        }
      });
    },
    [serverAction],
  );

  return {
    response,
    waitingForResponse,
    serverAction: serverActionAction,
  };
}
