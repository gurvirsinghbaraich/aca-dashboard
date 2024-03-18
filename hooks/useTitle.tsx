"use client";
import { useEffect, useState } from "react";

export function useTitle(text: string, locale: string = "en") {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) document.title = text;
  }, [locale, mounted]);
}
