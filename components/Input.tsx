"use client";
import { cn } from "@/lib/cn";
import gsap from "gsap";
import React from "react";

const Input = ({
  title,
  error,
  className,
  icon,
  ...props
}: {
  title: string;
  error?: string | null;
  icon?: React.ReactNode;
} & React.ComponentPropsWithRef<"input">) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const iconContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(
    function () {
      if (inputRef == null) {
        return;
      }

      if (
        !(inputRef as React.RefObject<HTMLInputElement>).current ||
        !iconContainerRef.current
      ) {
        return;
      }

      const { width } = iconContainerRef.current.getBoundingClientRect();
      if (width == 0) {
        return;
      }

      const timeline = gsap.timeline();

      timeline
        .add("start")
        .fromTo(
          (inputRef as React.RefObject<HTMLInputElement>).current!,
          {},
          {
            paddingLeft: `${width * 1.4}px`,
          },
          "start",
        )
        .fromTo(
          iconContainerRef.current!,
          { opacity: 0 },
          { opacity: 1 },
          "start",
        );

      timeline.play();
    },
    [inputRef, iconContainerRef],
  );

  return (
    <div className="flex w-full flex-col gap-1">
      <label className="text-sm" title={title}>
        {title}
      </label>
      <div className="relative w-full">
        <div
          ref={iconContainerRef}
          className="pointer-events-none absolute left-2 top-1/2 w-max -translate-y-1/2 opacity-0"
        >
          {icon}
        </div>
        <input
          className={cn(
            "w-full rounded border p-3 px-3 font-normal outline-[var(--accent)]",
            className,
          )}
          {...props}
          ref={inputRef}
        />
      </div>
      {error && (
        <span className="mt-1 text-xs italic text-red-500">{error}</span>
      )}
    </div>
  );
};

export default Input;
