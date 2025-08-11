import React, { useState } from "react";
import ScanOptionCard from "@/components/ui/ScanOptionCard";
import ToggleSwitch from "@/components/ui/ToggleSwitch";
import StartScanFooter from "@/components/ui/StartScanFooter";

const SelectScanType: React.FC = () => {
  const [selectedScan, setSelectedScan] = useState<"basic" | "deep">("basic");
  const [secretsDetection, setSecretsDetection] = useState(true);
  const [dependenciesScan, setDependenciesScan] = useState(false);

  const handleStartScan = () => {
    alert(`Scan started with:
- Type: ${selectedScan}
- Secrets Detection: ${secretsDetection}
- Dependencies Scan: ${dependenciesScan}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 flex flex-col justify-center items-center">
      
        <h1 className="text-3xl font-bold mb-2 text-center">Select Scan Type</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Choose the type of scan to run on your repository
        </p>
        <div className="max-w-5xl w-full border border-gray-300 p-6">

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <ScanOptionCard
            title="Basic Scan (Recommended)"
            description="Covers common vulnerabilities and basic code checks."
            points={["Vulnerability scanning", "Dependency check", "Basic code quality"]}
            selected={selectedScan === "basic"}
            onClick={() => setSelectedScan("basic")}
          />
          <ScanOptionCard
            title="Deep Static Analysis"
            description="In-depth static code analysis and architecture insights."
            points={["Advanced vulnerability detection", "Code metrics", "Architecture analysis"]}
            selected={selectedScan === "deep"}
            onClick={() => setSelectedScan("deep")}
          />
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <ToggleSwitch
            label="Secrets Detection"
            checked={secretsDetection}
            onToggle={() => setSecretsDetection((prev) => !prev)}
          />
          <ToggleSwitch
            label="Dependencies Scan"
            checked={dependenciesScan}
            onToggle={() => setDependenciesScan((prev) => !prev)}
          />
        </div>

        <div className="flex justify-center">
          <StartScanFooter onStart={handleStartScan} />
        </div>
      </div>
    </div>
  );
};

export default SelectScanType;
