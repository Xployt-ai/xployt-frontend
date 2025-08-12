import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TypographyH1, TypographyH2 } from "@/components/ui/typography.tsx";
import { DetailItem } from "@/components/DetailItem.tsx";
import { ScanStatus } from "@/features/ScanStatus.tsx";
import { ScanLiveSummary } from "@/features/ScanLiveSummary.tsx";
import { ScanDetails } from "@/features/ScanDetails.tsx";
import { scanEndpoints } from "@/data/network/scan.ts";
import type { ScanFinding, ScanProgress, ScanStep } from "@/data/models/scan.ts";
import { scan } from "@/data/mock/scan.ts";

const projectDetails = [
  {label: "Repository", value: "Automatisch"},
  {label: "Last Commit", value: "2023-11-20"},
];

const ScanningPage = () => {

  const [scanProgress, setScanProgress] = useState<ScanProgress>({
    progress_percent: 0,
    progress_text: "",
    scan_id: "",
    status: ""
  })
  const [scanSteps, setScanSteps] = useState<ScanStep[]>([])
  const [scanFindings, setScanFindings] = useState<ScanFinding[]>([])
  const [scanIndicators, setScanIndicators] = useState<string[][]>([])

  const {scan_id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!scan_id) return

        const data = await scanEndpoints.getScanProgress(scan_id)
        setScanProgress(data)

        if (data.progress_percent >= 100) {
          clearInterval(interval)
          navigate(`/securitydashboard/${scan_id}`)
        }

      } catch (error) {
        console.error("Error fetching scan progress:", error)
        clearInterval(interval)
      }

    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Mock data for demonstration purposes
    setScanSteps(scan.ScanStepsMock)
    setScanFindings(scan.ScanFindingsMock)
    setScanIndicators(scan.ScanIndicatorsMock)
  }, []);


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
            <ScanStatus scanProgress={scanProgress} scanSteps={scanSteps}/>

            {/* Live Summary */}
            <ScanLiveSummary/>

            {/* Scan Details */}
            <ScanDetails scanFindings={scanFindings}/>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Project Details */}
            <div className="space-y-4">
              <TypographyH2>Project Details</TypographyH2>
              <div className="space-y-4">
                {projectDetails.map(({label, value}, index) => (
                  <DetailItem label={label} value={value} key={index}/>
                ))}
              </div>
            </div>

            {/* Scan Indicators */}
            <div className="space-y-4">
              <TypographyH2>Scan Indicators</TypographyH2>
              {scanIndicators.map(([label, value], index) => (
                <DetailItem key={index} label={label} value={value}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanningPage;

