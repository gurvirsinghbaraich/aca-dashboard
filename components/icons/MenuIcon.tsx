import { cn } from "@/lib/cn";
import React from "react";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M16.25 5h-15a1.25 1.25 0 110-2.5h15a1.25 1.25 0 110 2.5zm0 12.5h-15a1.25 1.25 0 110-2.5h15c.691 0 1.25.559 1.25 1.25s-.559 1.25-1.25 1.25z"
        className="opacity-40"
      ></path>
      <path
        fill="currentColor"
        d="M2.5 10c0-.691.56-1.25 1.25-1.25h15c.691 0 1.25.559 1.25 1.25s-.559 1.25-1.25 1.25h-15A1.25 1.25 0 012.5 10z"
      ></path>
    </svg>
  );
}

export default MenuIcon;
