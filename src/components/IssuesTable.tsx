import { Link } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import type { Vulnerability } from "@/data/models/scan.ts";

function getSeverityColor(severity: string) {
  switch (severity) {
    case "critical":
      return "bg-red-600 text-white";
    case "high":
      return "bg-orange-600 text-white";
    case "medium":
      return "bg-yellow-600 text-white";
    case "low":
      return "bg-blue-600 text-white";
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
      return "text-muted-foreground";
  }
}

export default function IssuesTable({ items }: { items: Vulnerability[] }) {
  return (
    <div className="bg-background rounded-lg border overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 grid grid-cols-4 gap-4 text-sm font-medium">
        <small className="text-sm font-medium">Issue</small>
        <small className="text-sm font-medium">Severity</small>
        <small className="text-sm font-medium">File</small>
        <small className="text-sm font-medium">Status</small>
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-8 text-center text-muted-foreground">No issues found matching your filters</div>
      ) : (
        items.map((issue) => (
          <Link key={issue.id} to={`/issuedetail/${issue.id}`} className="block">
            <div className="px-4 py-3 grid grid-cols-4 gap-4 text-sm border-t hover:bg-muted/50 cursor-pointer transition-colors">
              <p className="leading-7 hover:text-primary transition-colors">{issue.description}</p>
              <div>
                <span className={cn("px-2 py-1 rounded text-xs font-medium", getSeverityColor(issue.severity))}>
                  {issue.severity}
                </span>
              </div>
              <span className="text-sm text-muted-foreground truncate text-xs">{issue.relative_file_path + " : " + issue.line || "Unknown File"}</span>
              <small className={cn("text-sm font-medium", getStatusColor(issue.status ? issue.status : "Open"))}>{issue.status ? issue.status : "Open"}</small>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
