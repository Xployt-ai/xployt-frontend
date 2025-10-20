"use client";

import React from "react";
import { Card } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import { Check, Clock, Zap } from "lucide-react";

type ScanOptionCardProps = {
  title: string;
  description?: string;
  Icon?: React.ComponentType<{ className?: string }>;
  details?: string[];
  badge?: string;
  rightElement?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
};

const ScanOptionCard = ({
  title,
  description,
  Icon,
  details = [],
  badge,
  rightElement,
  selected,
  onClick,
}: ScanOptionCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "cursor-pointer transition border hover:border-primary hover:shadow-md flex flex-col justify-between h-full",
        selected ? "border-primary bg-muted" : ""
      )}
    >
      <div className="px-5 space-y-2">
        <div className="pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {Icon ? (
              <Icon className="w-7 h-7 filter grayscale opacity-75" />
            ) : null}
            <div>
              <h4 className="text-gray-200 text-lg font-semibold">{title}</h4>
              {description ? (
                <p className="text-gray-400">{description}</p>
              ) : null}
            </div>
          </div>

          {badge ? (
            <span className="bg-gray-500 text-gray-100 rounded px-2 py-1 text-xs">
              {badge}
            </span>
          ) : null}

          {rightElement ? (
            <div className="ml-4">{rightElement}</div>
          ) : null}
        </div>

        <div className="space-y-3 ">
          {details.map((d) => {
            const label = d ?? "";
            const lower = label.toLowerCase();

            const IconFor =
              lower.includes("duration") ? Clock :
              lower.includes("resource") || lower.includes("resources") ? Zap :
              Check;

            return (
              <div key={d} className="flex items-center text-gray-400 text-sm">
          <IconFor className="w-4 h-4 mr-2 text-gray-300" />
          {label}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default ScanOptionCard;
