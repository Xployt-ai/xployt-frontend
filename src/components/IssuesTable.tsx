import { Link } from "react-router-dom";
import { TypographyP, TypographyMuted, TypographySmall } from "@/components/ui/typography.tsx";
import { cn } from "@/lib/utils.ts";
import type { Vulnerability } from "@/data/models/scan.ts";

function getSeverityColor(severity: string) {
  switch (severity) {
    case "high":
      return "bg-red-600 text-white";
    case "medium":
      return "bg-orange-600 text-white";
    case "low":
      return "bg-yellow-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "Open":
      return "text-red-400";
    case "Resolved":
      return "text-green-400";
    case "In Progress":
      return "text-blue-400";
    default:
      return "text-gray-400";
  }
}

export default function IssuesTable({ items }: { items: Vulnerability[] }) {
  return (
    <div className="bg-background rounded-lg overflow-hidden">
      <div className="bg-gray-700 px-4 py-3 grid grid-cols-4 gap-4 text-sm font-medium text-gray-300">
        <TypographySmall>Issue</TypographySmall>
        <TypographySmall>Severity</TypographySmall>
        <TypographySmall>File</TypographySmall>
        <TypographySmall>Status</TypographySmall>
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-8 text-center text-gray-400">No issues found matching your filters</div>
      ) : (
        items.map((issue) => (
          <Link key={issue.id} to={`/issuedetail/${issue.id}`} className="block">
            <div className="px-4 py-3 grid grid-cols-4 gap-4 text-sm border-t border-gray-700 hover:bg-gray-900 cursor-pointer transition-colors">
              <TypographyP className="hover:text-blue-400">{issue.description}</TypographyP>
              <div>
                <span className={cn("px-2 py-1 rounded text-xs font-medium", getSeverityColor(issue.severity))}>
                  {issue.severity}
                </span>
              </div>
              <TypographyMuted className="truncate text-xs">{issue.relative_file_path + " : " + issue.line || "Unknown File"}</TypographyMuted>
              <TypographySmall className={getStatusColor(issue.status ? issue.status : "Open")}>{issue.status ? issue.status : "Open"}</TypographySmall>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
