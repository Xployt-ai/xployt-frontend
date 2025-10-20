import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/Button";
import {
  TypographyH1,
  TypographyH2,
  TypographySmall,
  TypographyMonospace,
} from "@/components/ui/typography";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import type { ScanProgress } from "@/data/models/scan.ts";
import { scanEndpoints } from "@/data/network/scan.ts";

const scanSteps = [
  { label: "Basic Scan", status: "Done", color: "green" },
  { label: "Deep Static Analysis", status: "Ongoing", color: "yellow" },
  { label: "Runtime Behavior Scan", status: "Queued", color: "red" },
];

const projectDetails = [
  { label: "Repository", value: "Automatisch" },
  { label: "Last Commit", value: "2023-11-20" },
];

const scanFindings = [
  {
    severity: "High",
    finding: "SQL Injection Vulnerability",
    url: "https://acme.co/login",
  },
  {
    severity: "Medium",
    finding: "Cross-Site Scripting (XSS)",
    url: "https://acme.co/search",
  },
  {
    severity: "Low",
    finding: "Outdated Software Version",
    url: "https://acme.co/about",
  },
];

const scanIndicators = [
  ["Pages Scanned", "150/192"],
  ["Vulnerabilities Found", "5"],
  ["Errors", "2"],
];

const ScanDashboard = () => {
  const [scanProgress, setScanProgress] = useState<ScanProgress>({
    progress_percent: 67,
    progress_text: "",
    scan_id: "",
    status: "",
  });

  const { scan_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!scan_id) return;

        const data = await scanEndpoints.getScanProgressSSE(scan_id);
        setScanProgress(data);

        if (data.progress_percent >= 100) {
          clearInterval(interval);
          navigate(`/securitydashboard/${scan_id}`);
        }
      } catch (error) {
        console.error("Error fetching scan progress:", error);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <TypographyH1 className="text-3xl font-bold mb-8">Scan in progress</TypographyH1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-10">
            {/* Scan Status */}
            <div className="space-y-4">
              <TypographyH2 className="text-xl font-semibold">Scan Status</TypographyH2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <TypographySmall className="uppercase text-gray-400">Overall Progress</TypographySmall>
                  <TypographySmall>{scanProgress.progress_percent}%</TypographySmall>
                </div>
                <Progress value={scanProgress.progress_percent} className="bg-gray-700 h-2 rounded-full" />
                <TypographyMonospace>{scanProgress.progress_text}</TypographyMonospace>
              </div>

              <div className="space-y-3 pt-4">
                {scanSteps.map(({ label, status, color }, index) => (
                  <div
                    key={label}
                    className={clsx(
                      "flex justify-between items-center py-3",
                      index !== 0 && "border-t border-gray-700"
                    )}
                  >
                    <TypographySmall>{label}</TypographySmall>
                    <div className="flex items-center gap-2">
                      <span
                        className={clsx("w-2 h-2 rounded-full", {
                          "bg-green-500": color === "green",
                          "bg-yellow-500": color === "yellow",
                          "bg-red-500": color === "red",
                        })}
                      />
                      <TypographySmall className="text-gray-400">{status}</TypographySmall>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Summary */}
            <div className="space-y-4">
              <TypographyH2 className="text-xl font-semibold">Live Summary</TypographyH2>
              <div className="flex justify-between items-center">
                <TypographySmall className="text-gray-400">2 secrets found</TypographySmall>
                <Button variant="secondary" className="bg-white text-black hover:bg-gray-300 px-4">
                  Cancel Scan
                </Button>
              </div>
            </div>

            {/* Scan Details */}
            <div className="space-y-4">
              <TypographyH2 className="text-xl font-semibold">Scan Details</TypographyH2>

              <div className="grid grid-cols-3 gap-4 py-3 bg-blue-950 px-4 rounded-t">
                <TypographySmall className="text-white font-semibold">Severity</TypographySmall>
                <TypographySmall className="text-white font-semibold">Finding</TypographySmall>
                <TypographySmall className="text-white font-semibold">Affected URL</TypographySmall>
              </div>

              <div className="rounded-b overflow-hidden">
                {scanFindings.map(({ severity, finding, url }) => (
                  <div
                    key={finding}
                    className="grid grid-cols-3 gap-4 py-3 px-4 border-b border-gray-700 bg-black hover:bg-gray-800 transition"
                  >
                    <span
                      className={clsx(
                        "text-sm font-medium py-1 px-2 rounded-full text-center w-fit",
                        {
                          "bg-red-800 text-red-300": severity === "High",
                          "bg-yellow-800 text-yellow-300": severity === "Medium",
                          "bg-blue-800 text-blue-300": severity === "Low",
                        }
                      )}
                    >
                      {severity}
                    </span>
                    <TypographySmall className="text-gray-300">{finding}</TypographySmall>
                    <TypographySmall className="text-gray-400 truncate">{url}</TypographySmall>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-800 p-4 rounded-md space-y-6">
              {/* Project Details */}
              <div>
                <TypographyH2 className="text-white text-lg font-semibold mb-2">Project Details</TypographyH2>
                {projectDetails.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2 border-b border-gray-700 text-sm text-gray-400"
                  >
                    <span>{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>

              {/* Scan Indicators */}
              <div>
                <TypographyH2 className="text-white text-lg font-semibold mb-2">Scan Indicators</TypographyH2>
                {scanIndicators.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2 border-b border-gray-700 text-sm text-gray-400"
                  >
                    <span>{label}</span>
                    <span className="font-medium text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanDashboard;
