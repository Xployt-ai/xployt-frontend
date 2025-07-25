import {Progress} from "@/components/ui/progress"
import {Button} from "@/components/ui/Button"
import {
  TypographyH1,
  TypographyH2, TypographyMonospace,
  TypographySmall,
} from "@/components/ui/typography"
import {useEffect, useState} from "react";
import type {ScanProgress} from "@/data/models/scan.ts";
import {scanEndpoints} from "@/data/network/scan.ts";
import {useNavigate, useParams} from "react-router-dom";

const scanSteps = [
  {label: "Basic Scan", status: "Done", color: "green"},
  {label: "Deep Static Analysis", status: "Ongoing", color: "yellow"},
  {label: "Runtime Behavior Scan", status: "Queued", color: "red"},
]


const projectDetails = [
  {label: "Repository", value: "Automatisch"},
  {label: "Last Commit", value: "2023-11-20"},
];

const scanFindings = [
  {
    severity: "High",
    finding: "SQL Injection Vulnerability",
    url: "/src/pages/login.js",
  },
  {
    severity: "Medium",
    finding: "Cross-Site Scripting (XSS)",
    url: "/src/pages/search.js",
  },
  {
    severity: "Low",
    finding: "Outdated Software Version",
    url: "/src/pages/about.js",
  },
]

const scanIndicators = [
  ["Pages Scanned", "150/192"],
  ["Vulnerabilities Found", "5"],
  ["Errors", "2"],
]

const ScanDashboard = () => {
  const [scanProgress, setScanProgress] = useState<ScanProgress>({
    progress_percent: 0,
    progress_text: "",
    scan_id: "",
    status: ""
  })
  const {scan_id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!scan_id) return

        const data = await scanEndpoints.getScanProgress(scan_id)
        setScanProgress(data)

        if( data.progress_percent >= 100) {
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

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <TypographyH1>Scan in Progress</TypographyH1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scan Status */}
            <div className="space-y-6">
              <TypographyH2>Scan Status</TypographyH2>

              {/* Overall Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <TypographySmall>Overall Progress</TypographySmall>
                  <TypographySmall>{scanProgress.progress_percent}</TypographySmall>
                </div>
                <Progress value={scanProgress.progress_percent} className="bg-gray-800 h-1"/>
                <TypographyMonospace>{scanProgress.progress_text}</TypographyMonospace>
              </div>

              {/* Scan Steps */}
              <div className="space-y-4">
                {scanSteps.map(({label, status, color}, index) => (
                  <div
                    key={label}
                    className={`flex justify-between items-center py-3 ${
                      index !== 0 ? "border-t border-gray-700" : ""
                    }`}
                  >
                    <TypographySmall>{label}</TypographySmall>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 bg-${color}-500 rounded-full`}/>
                      <TypographySmall className={`text-muted-foreground text-sm`}>
                        {status}
                      </TypographySmall>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Live Summary */}
            <div className="space-y-4">
              <TypographyH2>Live Summary</TypographyH2>
              <div className="flex justify-between items-center">
                <TypographySmall className="text-muted-foreground">2 secrets found</TypographySmall>
                <Button
                  variant="secondary"
                >
                  Cancel Scan
                </Button>
              </div>
            </div>

            {/* Scan Details */}
            <div className="space-y-6">
              <TypographyH2>Scan Details</TypographyH2>

              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 py-3 bg-gray-800 px-4 rounded-t">
                <TypographySmall className="text-white">Severity</TypographySmall>
                <TypographySmall className="text-white">Finding</TypographySmall>
                <TypographySmall className="text-white">Affected URL</TypographySmall>
              </div>

              {/* Table Rows */}
              <div className=" rounded-b">
                {scanFindings.map(({severity, finding, url}) => (
                  <div
                    key={finding}
                    className="grid grid-cols-3 gap-4 py-3 px-4 border-b border-gray-800 last:border-b-0"
                  >
                    <TypographySmall className={` text-muted-foreground `}>
                      {severity}
                    </TypographySmall>
                    <TypographySmall className="text-muted-foreground">{finding}</TypographySmall>
                    <TypographySmall className="truncate">{url}</TypographySmall>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Project Details */}
            <div className="space-y-4">
              <TypographyH2>Project Details</TypographyH2>
              <div className="space-y-4">
                {projectDetails.map(({label, value}) => (
                  <div key={label} className="flex justify-between items-center">
                    <TypographySmall className="text-muted-foreground">{label}</TypographySmall>
                    <TypographySmall className="text-muted-foreground">{value}</TypographySmall>
                  </div>
                ))}
              </div>
            </div>


            {/* Scan Indicators */}
            <div className="space-y-4">
              <TypographyH2>Scan Indicators</TypographyH2>
              {scanIndicators.map(([label, value]) => (
                <div key={label} className="flex justify-between items-center">
                  <TypographySmall className="text-muted-foreground">{label}</TypographySmall>
                  <TypographySmall className="text-muted-foreground">{value}</TypographySmall>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScanDashboard
