import React from "react";
import { cn } from "@/lib/utils.ts";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#1c1c1e] p-8 rounded-xl w-full max-w-xl shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
