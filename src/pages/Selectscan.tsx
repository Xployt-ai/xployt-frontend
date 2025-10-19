"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";

import ScanTemplateCard from "@/components/ScanTemplateCard";
import ScanOptionCard from "@/components/ScanOptionCard";


// import templates and options from data file
import { templates as templateData, options as optionData } from "@/data/types/scan_types";
import { scanCollectionEndpoints } from "@/data/network/scan_collection.ts";

export default function SecurityScanUI() {
  const navigate = useNavigate();
  const { repo_name } = useParams();
  console.log("reponame: ", repo_name);

  // default selected template is "Full Scan"
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>("Full Scan");

  // all options currently selected
  const [selectedOptionTitles, setSelectedOptionTitles] = useState<Set<string>>(() => {
    const t = templateData.find((x) => x.title === "Full Scan");
    const templateScannerTypes = t?.scan_types ?? [];
    const optionsToAuto = optionData
      .filter((o) => o.scanner.some((s) => templateScannerTypes.includes(s)))
      .map((o) => o.title);
    return new Set(optionsToAuto);
  });

  // derive scanners contributed by the selected template
  const templateScanners = useMemo(() => {
    if (!selectedTemplate) return [] as string[];
    const t = templateData.find((x) => x.title === selectedTemplate);
    return t?.scan_types ?? [];
  }, [selectedTemplate]);

  // derive scanners contributed by manually/auto selected options
  const optionScanners = useMemo(() => {
    const scanners: string[] = [];
    selectedOptionTitles.forEach((title) => {
      const o = optionData.find((opt) => opt.title === title);
      if (o?.scanner) scanners.push(...o.scanner);
    });
    return scanners;
  }, [selectedOptionTitles]);

  // final scanners list to send to the endpoint (deduplicated)
  const scannersList = useMemo(() => {
    const s = new Set<string>([...templateScanners, ...optionScanners]);
    return Array.from(s);
  }, [templateScanners, optionScanners]);

  function handleTemplateSelect(title: string) {
    const isSame = selectedTemplate === title;

    if (isSame) {
      // deselect template -> clear auto-selected options
      setSelectedTemplate(null);
      setSelectedOptionTitles(new Set());
      return;
    }

    // selecting a new template -> auto-select options that map to its scanners
    const t = templateData.find((x) => x.title === title);
    const templateScannerTypes = t?.scan_types ?? [];

    const optionsToAuto = optionData
      .filter((o) => o.scanner.some((s) => templateScannerTypes.includes(s)))
      .map((o) => o.title);

    setSelectedTemplate(title);
    setSelectedOptionTitles(new Set(optionsToAuto));
  }

  function handleToggleOption(title: string) {
    // If a template is active, deselect it whenever the user interacts with options
    if (selectedTemplate) {
      setSelectedTemplate(null);
    }

    setSelectedOptionTitles((prev) => {
      const n = new Set(prev);
      if (n.has(title)) n.delete(title);
      else n.add(title);
      return n;
    });
  }

  async function handleStartScan() {
    // Placeholder: send scannersList to endpoint
    console.log("Starting scan with scanners:", scannersList);
    if (!repo_name) return;

    try {
      const collection = await scanCollectionEndpoints.createScanCollection(repo_name, scannersList);
      navigate(`/scanning/${collection.collection_id}`);
    } catch (error) {
      console.error("Error starting scan:", error);
    }
  }

  return (
    <div className="min-h-screen p-12 flex flex-col items-center font-sans ">
      <div className="w-full max-w-6xl space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-200 mb-2">
            Select Scan Type
          </h1>
          <p className="text-gray-400 text-base">Choose the security scan that best fits your needs</p>
        </div>

        {/* Recommended Templates */}
        <section>
          <h2 className="text-lg font-semibold text-gray-200 mb-4">Recommended Templates</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templateData.map((t) => (
              <ScanTemplateCard
                key={t.title}
                title={t.title}
                description={t.description}
                features={t.features}
                badge={t.scan_types?.length ? undefined : undefined}
                selected={selectedTemplate === t.title}
                onSelect={() => handleTemplateSelect(t.title)}
              />
            ))}
          </div>
        </section>

        {/* Individual Scan Options */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-200 mb-2">Individual Scan Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {optionData.map((o) => (
              <ScanOptionCard
                key={o.title}
                title={o.title}
                description={o.description}
                Icon={o.Icon}
                details={o.details}
                badge={o.badge}
                selected={selectedOptionTitles.has(o.title)}
                onClick={() => handleToggleOption(o.title)}
              />
            ))}
          </div>
        </section>

        {/* Footer Button */}
        <div className="pt-6 flex flex-col gap-4 border-t border-gray-700">
          <div className="flex justify-end">
            <Button size="lg" className="bg-gray-300 hover:bg-gray-100 text-gray-900 font-semibold px-8 py-2 rounded-md shadow" onClick={handleStartScan}>
              Start Scan
            </Button>
          </div>


        </div>
      </div>
    </div>
  );
}
