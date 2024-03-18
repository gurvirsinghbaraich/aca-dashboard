"use client";
import { locales } from "@/locales";
import { LanguageIcon } from "./icons";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function LanguageButton() {
  const router = useRouter();
  const languageIconRef = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      if (!languageIconRef.current) return;

      languageIconRef.current.addEventListener("click", () => {
        const { pathname } = window.location;
        const identifer = pathname.replace(/\/(..)?(\/.*)/, "$1:$2");

        const [locale, path] = identifer.split(":");
        let localeIndex = locales.indexOf(locale) + 1;

        if (localeIndex === -1) return;
        if (localeIndex === locales.length) {
          localeIndex = 0;
        }

        router.push(`/${locales[localeIndex]}${path}`);
      });
    },
    [languageIconRef, router],
  );

  return (
    <div ref={languageIconRef} title="Toggle Language">
      <LanguageIcon className="h-6 w-6 cursor-pointer" />
    </div>
  );
}
