import React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
