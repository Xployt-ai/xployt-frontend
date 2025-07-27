import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyMuted,
  TypographyP,
  TypographySmall
} from "@/components/ui/typography.tsx";
import { Card } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import { useEffect, useState } from "react";
import type { ScanResult } from "@/data/models/scan.ts";
import { useParams } from "react-router-dom";
import { scanEndpoints } from "@/data/network/scan.ts";

const SecurityDashboardPage = () => {
  const [results, setResults] = useState<ScanResult[]>([]);
  const {scan_id} = useParams();

  useEffect(() => {
    try{
      const fetchResults = async () => {
        if (!scan_id) return;
        const data = await scanEndpoints.getScanResults(scan_id)
        setResults(data)
      }
      fetchResults();
    }catch (error) {
      console.error("Failed to fetch scan results:", error);
    }
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-orange-600 text-white';
      case 'Medium': return 'bg-yellow-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-red-400';
      case 'Resolved': return 'text-green-400';
      case 'In Progress': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const projectDetails = [
    {
      label: "Repository",
      value: "Automatisch",
    },
    {
      label: "Last scan",
      value: "July 26, 2024, 10:30 AM",
    },
    {
      label: "Duration",
      value: "3 Min 56 Sec.",
    },
  ];
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <TypographyH1 className="mb-8">Project Security Overview</TypographyH1>

        {/* Project Details */}
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <TypographyH2 className="mb-4">Project Details</TypographyH2>
              <div className="rounded-lg p-4 space-y-3">
                {projectDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-t border-gray-700 py-4"
                  >
                    <TypographyP>{item.label}</TypographyP>
                    <TypographyMuted>{item.value}</TypographyMuted>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Issues Section */}
        <div className="mb-8">
          <TypographyH2>Issues</TypographyH2>
          <TypographyMuted className="mb-6 block">
            View and manage all security issues across your organization.
          </TypographyMuted>

          {/* Security Posture Score */}
          <div className="mb-6">
            <TypographyH3>Security Posture Score</TypographyH3>
            <TypographyH2 className="text-gray-400">75/100</TypographyH2>
          </div>

          {/* Issue Summary */}
          <div className="mb-6">
            <TypographyH3 className="mb-4">Issue Summary</TypographyH3>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <TypographySmall className="text-gray-400 ">Critical</TypographySmall>
                <TypographyH2 >3</TypographyH2>
              </Card>
              <Card >
                <TypographySmall className="text-gray-400 ">High</TypographySmall>
                <TypographyH2 >5</TypographyH2>
              </Card>
              <Card >
                <TypographySmall className="text-gray-400 ">Medium</TypographySmall>
                <TypographyH2 >2</TypographyH2>
              </Card>
            </div>
          </div>

          {/* Recent Issues */}
          <div>
            <TypographyH3 className="mb-4">Recent Issues</TypographyH3>

            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-4">
              {[1, 2, 3, 4].map((_, idx) => (
                <button key={idx} className="p-2 border rounded hover:bg-gray-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={[
                        "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z", // bookmark
                        "M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4", // arrows
                        "M4 6h16M4 10h16M4 14h16M4 18h16", // list
                        "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" // download
                      ][idx]}
                    />
                  </svg>
                </button>
              ))}
            </div>

            {/* Issues Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="bg-gray-700 px-4 py-3 grid grid-cols-4 gap-4 text-sm font-medium text-gray-300">
                <TypographySmall>Issue</TypographySmall>
                <TypographySmall>Severity</TypographySmall>
                <TypographySmall>Status</TypographySmall>
                <TypographySmall>File</TypographySmall>
              </div>

              {results.map((issue) => (
                <div
                  key={issue.id}
                  className="px-4 py-3 grid grid-cols-4 gap-4 text-sm border-t border-gray-700 hover:bg-gray-700"
                >
                  <TypographyP>{issue.description}</TypographyP>
                  <div>
                    <span
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium',
                        getSeverityColor(issue.severity)
                      )}
                    >
                      {issue.severity}
                    </span>
                  </div>
                  <TypographySmall className={getStatusColor(issue.status ? issue.status : 'Open')}>
                    {issue.status ? issue.status : 'Open'}
                  </TypographySmall>
                  <TypographyMuted className="truncate text-xs">
                    {issue.location.endpoint + " : " + issue.location.line || 'Unknown File'}
                  </TypographyMuted>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboardPage;
