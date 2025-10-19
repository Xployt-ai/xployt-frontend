// Explanation: New reusable component for the template cards used on the Select Scan page. Keeps markup small, typed props, and handles the Select action via a callback.

"use client"

import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

type ScanTemplateCardProps = {
  title: string;
  description: string;
  badge?: string;
  features?: string[];
  onSelect?: () => void;
};

export default function ScanTemplateCard({
  title,
  description,
  badge,
  features = [],
  onSelect,
}: ScanTemplateCardProps) {
  return (
    <div className="hover:bg-gray-900 border border-gray-700 rounded-xl shadow-lg transition p-6 bg-transparent">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-gray-200 text-xl font-semibold">{title}</h3>
        {badge ? (
          <span className="inline-block bg-gray-600 text-gray-200 rounded px-2 py-1 text-xs">
            {badge}
          </span>
        ) : null}
      </div>

      <p className="text-gray-400 mb-4">{description}</p>

      <div className="space-y-3">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-gray-400 text-sm font-medium">
            <Check className="w-4 h-4 filter grayscale opacity-75" /> {f}
          </div>
        ))}

        <Button
          onClick={onSelect}
          className="w-full bg-gray-300 text-gray-900 hover:bg-gray-100 mt-4 rounded-md font-semibold transition"
        >
          Select Template
        </Button>
      </div>
    </div>
  );
}
