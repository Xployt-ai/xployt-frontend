import { TypographySmall } from "@/components/ui/typography.tsx";

export default function FilterBar(props: {
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  selectedSeverity: string;
  setSelectedSeverity: (s: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  sortBy: "severity" | "status" | "file";
  setSortBy: (s: "severity" | "status" | "file") => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  firstIndex: number;
  lastIndex: number;
  total: number;
}) {
  return (
    <div className="mb-4 space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Search issues..."
          value={props.searchTerm}
          onChange={(e) => props.setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-background border rounded flex-1 min-w-[200px]"
        />

        <select
          value={props.selectedSeverity}
          onChange={(e) => props.setSelectedSeverity(e.target.value)}
          className="px-4 py-2 bg-background border rounded "
        >
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={props.selectedStatus}
          onChange={(e) => props.setSelectedStatus(e.target.value)}
          className="px-4 py-2 bg-background border rounded"
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <select
          value={props.sortBy}
          onChange={(e) => props.setSortBy(e.target.value as any)}
          className="px-4 py-2 bg-background border rounded"
        >
          <option value="severity">Sort by Severity</option>
          <option value="status">Sort by Status</option>
          <option value="file">Sort by File</option>
        </select>

        {props.hasActiveFilters && (
          <button onClick={props.clearFilters} className="px-4 py-2 border rounded hover:bg-gray-700">
            Clear Filters
          </button>
        )}
      </div>

      <TypographySmall className="text-gray-400">
        Showing {props.firstIndex + 1}-{props.lastIndex} of {props.total} issues
      </TypographySmall>
    </div>
  );
}
