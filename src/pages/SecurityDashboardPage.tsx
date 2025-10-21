import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Code2 } from "lucide-react";
import type { Vulnerability } from "@/data/models/scan.ts";

import ProjectDetailsCard from "@/components/ProjectDetailsCard";
import SummaryGrid from "@/components/SummaryGrid";
import FilterBar from "@/components/FilterBar";
import IssuesTable from "@/components/IssuesTable";
import PaginationControl from "@/components/PaginationControl";
import { scanCollectionEndpoints } from "@/data/network/scan_collection.ts";
import type { ScanCollection } from "@/data/models/scan_collection.ts";

// ...existing code continues (SecurityDashboardPage component unchanged) ...
const SecurityDashboardPage = () => {
  const [results, setResults] = useState<Vulnerability[]>([]);
  const {collection_id} = useParams<{ collection_id: string }>();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<ScanCollection>({
    id: "",
    repository_name: "",
    scanners: [],
    scan_ids: [],
    status: "",
    progress_percent: 0,
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"severity" | "status" | "file">("severity");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // You can use repo parameter to fetch specific repository data
        if (!collection_id) return;
        const data = await scanCollectionEndpoints.getCollectionResults(collection_id)
        const collection = await scanCollectionEndpoints.getScanCollection(collection_id);
        setResults(data.vulnerabilities);
        setCollection(collection)
      } catch (error) {
        console.error("Failed to fetch scan results:", error);
      }
    };
    fetchResults();
  }, [collection_id]);

  // Store current repo in localStorage for navigation context
  useEffect(() => {
    if (collection_id) {
      localStorage.setItem("currentRepo", collection_id);
    }
  }, [collection_id]);

  // Compute filtered and sorted results immutably with useMemo
  const filteredResults = useMemo(() => {
    let filtered = [...results];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (issue) =>
          issue.description.toLowerCase().includes(term) ||
          issue.relative_file_path.toLowerCase().includes(term) ||
          issue.severity.toLowerCase().includes(term)
      );
    }

    if (selectedSeverity !== "All") {
      filtered = filtered.filter((issue) => issue.severity === selectedSeverity);
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (issue) => (issue.status || "Open") === selectedStatus
      );
    }

    filtered.sort((a, b) => {
      // todo: fix filters
      if (sortBy === "severity") {
        const severityOrder: Record<string, number> = {
          Critical: 0,
          High: 1,
          Medium: 2,
          Low: 3,
        };
        return (
          (severityOrder[a.severity] || 99) - (severityOrder[b.severity] || 99)
        );
      }
      return 0;
    });

    return filtered;
  }, [results, searchTerm, selectedSeverity, selectedStatus, sortBy]);

  // Pagination calculations derived from filteredResults
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const counts = useMemo(
    () => ({
      critical: results.filter((r) => r.severity === "critical").length,
      high: results.filter((r) => r.severity === "high").length,
      medium: results.filter((r) => r.severity === "medium").length,
      low: results.filter((r) => r.severity === "low").length,
    }),
    [results]
  );

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedSeverity("All");
    setSelectedStatus("All");
    setSortBy("severity");
  }, []);

  const hasActiveFilters =
    !!searchTerm || selectedSeverity !== "All" || selectedStatus !== "All";

  const handleViewCodebase = () => {
    if (collection.repository_name) {
      // Navigate to code viewer with repository name as query parameter
      navigate(`/codeviewer?repo=${encodeURIComponent(collection.repository_name)}${collection_id ? `&collection_id=${encodeURIComponent(collection_id)}` : ""}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-3xl font-bold">
            {collection.repository_name ? `${collection.repository_name} Security Overview` : "Project Security Overview"}
          </h1>
          
          {collection.repository_name && (
            <button
              onClick={handleViewCodebase}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-600 hover:border-slate-500"
            >
              <Code2 size={18} />
              <span className="font-medium">View Codebase</span>
            </button>
          )}
        </div>          

        <ProjectDetailsCard repo={collection.repository_name}/>

        <div className="mb-8">
          <h2 className="pb-2 text-white text-2xl font-semibold">Issues</h2>
          <p className="text-sm text-muted-foreground mb-6">
            View and manage all security issues across your organization.
          </p>

          <SummaryGrid counts={counts}/>

          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold  mb-4">Recent Issues</h3>

            <FilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedSeverity={selectedSeverity}
              setSelectedSeverity={setSelectedSeverity}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
              clearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              firstIndex={indexOfFirstItem}
              lastIndex={Math.min(indexOfLastItem, filteredResults.length)}
              total={filteredResults.length}
            />

            <IssuesTable items={currentItems}/>

            <PaginationControl
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboardPage;
