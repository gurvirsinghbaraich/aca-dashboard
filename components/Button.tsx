import { cn } from "@/lib/cn";
import React from "react";
import { LoadingIcon } from "./icons";

const Button = React.forwardRef<
  React.ElementRef<"button">,
  {
    title: string;
    loading?: boolean;
  } & React.ComponentPropsWithoutRef<"button">
>(({ className, title, loading, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        "w-full rounded border border-[var(--accent)] bg-[var(--accent)] p-3 px-4 text-white outline-none hover:opacity-90",
        className,
      )}
    >
      {loading ? (
        <div className="w-full">
          <LoadingIcon className="mx-auto h-6" />
        </div>
      ) : (
        title
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
