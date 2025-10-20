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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            Select Security Scan
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose the security scan that best fits your needs
          </p>
        </div>

        <div className="space-y-12">
          {/* Recommended Templates */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Recommended Templates</h2>
              <p className="text-muted-foreground">Pre-configured scan combinations for common use cases</p>
            </div>

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
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">Individual Scan Options</h2>
              <p className="text-muted-foreground">Customize your scan by selecting specific security checks</p>
            </div>

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

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-8 border-t">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {selectedOptionTitles.size} scanner{selectedOptionTitles.size !== 1 ? 's' : ''} selected
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedTemplate ? `Using ${selectedTemplate} template` : 'Custom configuration'}
              </p>
            </div>
            <Button 
              size="lg" 
              onClick={handleStartScan}
              disabled={scannersList.length === 0}
              className="px-8"
            >
              Start Scan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
