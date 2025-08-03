import React from "react";
import { cn } from "@/lib/utils";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[#ffffff05] border-gray-600 border-2 p-8 rounded-xl max-w-xl shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
