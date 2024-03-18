"use client";
import { useEffect, useState } from "react";
import translate from "./translate";

export function useTitle(text: string) {
  const t = translate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) document.title = t(text);
  }, [mounted]);
}
