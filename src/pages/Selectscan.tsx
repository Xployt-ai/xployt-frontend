"use client";

import { Button } from "@/components/ui/Button";
import { useParams } from "react-router-dom";
import { templates, options } from "@/data/types/scan_types";
import ScanTemplateCard from "@/components/ScanTemplateCard";
import ScanOptionCard from "@/components/ScanOptionCard";

export default function SecurityScanUI() {
  // const [enableAI, setEnableAI] = useState(false);

  const { repo_name } = useParams();
  console.log("reponame: ", repo_name);


  return (
    <div className="min-h-screen p-12 flex flex-col items-center font-sans bg-gray-950">
      <div className="w-full max-w-6xl space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-2">
            Select Scan Type
          </h1>
          <p className="text-gray-400 text-base">
            Choose the security scan that best fits your needs
          </p>
        </div>

        {/* Recommended Templates */}
        <section>
          <h2 className="text-lg font-semibold text-gray-200 mb-4">
            Recommended Templates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map((t) => (
              <ScanTemplateCard
                key={t.title}
                title={t.title}
                description={t.description}
                features={t.features}
                onSelect={() => console.log("Selected template:", t.title)}
              />
            ))}
          </div>
        </section>

        {/* Individual Scan Options */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">
            Individual Scan Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((o) => (
              <ScanOptionCard
                key={o.title}
                title={o.title}
                description={o.description}
                Icon={o.Icon}
                details={o.details}
                badge={o.badge}
              />
            ))}
          </div>
        </section>

        {/* Footer Button */}
        <div className="pt-6 flex justify-end border-t border-gray-700">
          <Button
            size="lg"
            className="bg-gray-300 hover:bg-gray-100 text-gray-900 font-semibold px-8 py-2 rounded-md shadow"
            onClick={() => console.log("Starting scan...")}
          >
            Start Scan
          </Button>
        </div>
      </div>
    </div>
  );
}
