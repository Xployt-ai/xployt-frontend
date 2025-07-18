import { cn } from "@/lib/utils.ts";
import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-semibold mb-1">{label}</label>}
      <input
        {...props}
        className={cn(
          "w-full p-2 rounded-md bg-black border border-gray-700 text-white",
          "",
          className
        )}
      />
    </div>
  );
}
