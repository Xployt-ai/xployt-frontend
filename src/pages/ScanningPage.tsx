import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography.tsx";
import { DetailItem } from "@/components/DetailItem.tsx";
import { ScanStatus } from "@/features/ScanStatus.tsx";
import { ScanLiveSummary } from "@/features/ScanLiveSummary.tsx";
import { ScanDetails } from "@/features/ScanDetails.tsx";
import type { ScanFinding, ScanProgressAggStream, ScanStep } from "@/data/models/scan.ts";
import { scan } from "@/data/mock/scan.ts";
import { scanCollectionEndpoints } from "@/data/network/scan_collection.ts";

const projectDetails = [
  { label: "Repository", value: "Automatisch" },
  { label: "Last Commit", value: "2023-11-20" },
];

const ScanningPage = () => {
  const [scanProgressOverall, setScanProgressOverall] = useState<ScanProgressAggStream>({
    collection: {
      status: "unknown",
      progress_percent: 0
    },
    vulnerabilities: []
  });
  const [scanSteps, setScanSteps] = useState<ScanStep[]>([]);
  const [scanFindings, setScanFindings] = useState<ScanFinding[]>([]);
  const [scanIndicators, setScanIndicators] = useState<string[][]>([]);

  const { collection_id } = useParams();
  console.log("Collection ID:", collection_id); // Debug log

  // Poll scan progress
  useEffect(() => {
    const handleProgressUpdate = (data: ScanProgressAggStream) => {
      console.log("New update received:", data);
      setScanProgressOverall(data)
    }
    try {
      if (collection_id){
        const source = scanCollectionEndpoints.getScanProgressSSE(collection_id, handleProgressUpdate)
        return () => {
          console.log("Component unmounted — closing SSE connection.");
          source.close();
        };
      }
      console.log(scanSteps) // todo:remove
    } catch (error) {
      console.error("Error setting up scan progress SSE:", error);
    }

  }, [collection_id]);

  // Fetch scan results and steps
  useEffect(() => {
    if (!collection_id) return;

    const fetchScanData = async () => {
      try {
        // Always set scan steps (mock for now)
        setScanSteps(scan.ScanStepsMock);

        // Try API call
        // const results: Vulnerability[] = await scanEndpoints.getScanResults(scan_id);

        // const mappedResults: ScanFinding[] = results.map((vuln) => ({
        //   severity: mapSeverity(vuln.severity),
        //   finding: vuln.vulnerability,
        //   url: `${vuln.relative_file_path}:${vuln.line.join(", ")}`,
        // }));
        //
        // setScanFindings(mappedResults);
        //
        // setScanIndicators([
        //   ["Pages Scanned", "150/192"], // Replace when backend provides
        //   ["Vulnerabilities Found", results.length.toString()],
        //   ["Errors", "0"], // Replace when backend provides
        // ]);
      } catch (error) {
        console.error("Falling back to mock data due to error:", error);

        // Use mock data if API fails
        setScanSteps(scan.ScanStepsMock);
        setScanFindings(scan.ScanFindingsMock);
        setScanIndicators(scan.ScanIndicatorsMock);
      }
    };

    fetchScanData();
  }, [collection_id]);

  // Helper for severity mapping
  // const mapSeverity = (level: number): string => {
  //   if (level >= 4) return "High";
  //   if (level === 3) return "Medium";
  //   return "Low";
  // };

  return (
    <div className="min-h-screen flex flex-col flex-grow p-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <TypographyH1>Scan in Progress</TypographyH1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scan Status */}
            <ScanStatus progress={scanProgressOverall} />

            {/* Live Summary */}
            <ScanLiveSummary />

            {/* Scan Details */}
            <ScanDetails scanFindings={scanFindings} />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Project Details */}
            <div className="space-y-4">
              <TypographyH2>Project Details</TypographyH2>
              <div className="space-y-4">
                {projectDetails.map(({ label, value }, index) => (
                  <DetailItem label={label} value={value} key={index} />
                ))}
              </div>
            </div>

            {/* Scan Indicators */}
            <div className="space-y-4">
              <TypographyH2>Scan Indicators</TypographyH2>
              {scanIndicators.map(([label, value], index) => (
                <DetailItem key={index} label={label} value={value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanningPage;
