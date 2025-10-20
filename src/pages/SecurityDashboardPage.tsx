import { TypographyH1, TypographyH2, TypographyH3, TypographyMuted } from "@/components/ui/typography.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { Vulnerability } from "@/data/models/scan.ts";

import ProjectDetailsCard from "@/components/ProjectDetailsCard";
import SummaryGrid from "@/components/SummaryGrid";
import FilterBar from "@/components/FilterBar";
import IssuesTable from "@/components/IssuesTable";
import PaginationControl from "@/components/PaginationControl";
import { scanCollectionEndpoints } from "@/data/network/scan_collection.ts";

// ...existing code continues (SecurityDashboardPage component unchanged) ...
const SecurityDashboardPage = () => {
  const [results, setResults] = useState<Vulnerability[]>([]);
  const {collection_id} = useParams<{ collection_id: string }>();

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
        setResults(data.vulnerabilities);
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

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <TypographyH1 className="mb-8">
          {collection_id ? `${collection_id} Security Overview` : "Project Security Overview"}
        </TypographyH1>

        <ProjectDetailsCard repo={collection_id}/>

        <div className="mb-8">
          <TypographyH2>Issues</TypographyH2>
          <TypographyMuted className="mb-6 block">
            View and manage all security issues across your organization.
          </TypographyMuted>

          {/*<div className="mb-6">*/}
          {/*  <TypographyH3>Security Posture Score</TypographyH3>*/}
          {/*  <TypographyH2 className="text-gray-400">75/100</TypographyH2>*/}
          {/*</div>*/}

          <SummaryGrid counts={counts}/>

          <div>
            <TypographyH3 className="mb-4">Recent Issues</TypographyH3>

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
