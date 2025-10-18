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
  import { Link, useParams } from "react-router-dom";
  import type { ScanResult } from "@/data/models/scan.ts";
  import { scanEndpoints } from "@/data/network/scan.ts";


  // Dummy data for development/testing
  const DUMMY_SCAN_RESULTS: ScanResult[] = [
    {
      id: "1",
      description: "SQL Injection vulnerability in login endpoint",
      severity: "Critical",
      status: "Open",
      location: { endpoint: "/api/auth/login", line: 45 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "2",
      description: "Cross-Site Scripting (XSS) in user profile",
      severity: "Critical",
      status: "In Progress",
      location: { endpoint: "/api/users/profile", line: 128 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "3",
      description: "Insecure direct object reference in file download",
      severity: "Critical",
      status: "Open",
      location: { endpoint: "/api/files/download", line: 67 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "4",
      description: "Missing authentication on admin endpoint",
      severity: "High",
      status: "Open",
      location: { endpoint: "/api/admin/users", line: 23 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "5",
      description: "Weak password policy implementation",
      severity: "High",
      status: "Resolved",
      location: { endpoint: "/api/auth/register", line: 89 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "6",
      description: "Insufficient rate limiting on API",
      severity: "High",
      status: "In Progress",
      location: { endpoint: "/api/v1/*", line: 12 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "7",
      description: "Exposed sensitive information in error messages",
      severity: "High",
      status: "Open",
      location: { endpoint: "/api/payments/process", line: 156 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "8",
      description: "CORS misconfiguration allows unauthorized access",
      severity: "High",
      status: "Open",
      location: { endpoint: "/api/config/cors", line: 8 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "9",
      description: "Outdated dependency with known vulnerabilities",
      severity: "Medium",
      status: "Open",
      location: { endpoint: "package.json", line: 34 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "10",
      description: "Missing security headers in responses",
      severity: "Medium",
      status: "Resolved",
      location: { endpoint: "/middleware/security", line: 78 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "11",
      description: "Inadequate input validation on search functionality",
      severity: "Medium",
      status: "Open",
      location: { endpoint: "/api/search", line: 92 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "12",
      description: "Session fixation vulnerability",
      severity: "High",
      status: "In Progress",
      location: { endpoint: "/api/auth/session", line: 145 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "13",
      description: "Cleartext transmission of sensitive information",
      severity: "Critical",
      status: "Open",
      location: { endpoint: "/api/data/export", line: 203 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "14",
      description: "Broken access control in API endpoints",
      severity: "High",
      status: "Open",
      location: { endpoint: "/api/resources/*", line: 56 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    },
    {
      id: "15",
      description: "Unvalidated redirects and forwards",
      severity: "Medium",
      status: "Resolved",
      location: { endpoint: "/api/redirect", line: 31 },
      type: "",
      metadata: {},
      scan_id: "",
      created_at: ""
    }
  ];

  const SecurityDashboardPage = () => {
    const [results, setResults] = useState<ScanResult[]>([]);
    const [filteredResults, setFilteredResults] = useState<ScanResult[]>([]);
    const { repo } = useParams<{ repo: string }>(); // Get repo from URL params

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
          if (!repo) {
            // Use dummy data if no repo
            setResults(DUMMY_SCAN_RESULTS);
            return;
          }
          // You can use repo parameter to fetch specific repository data
          const data = await scanEndpoints.getScanResults(repo);
          setResults(data);
        } catch (error) {
          console.error("Failed to fetch scan results:", error);
          // Fallback to dummy data on error
          setResults(DUMMY_SCAN_RESULTS);
        }
      };
      fetchResults();
    }, [repo]);

    // Store current repo in localStorage for navigation context
    useEffect(() => {
      if (repo) {
        localStorage.setItem('currentRepo', repo);
      }
    }, [repo]);

    // Apply filters and sorting
    useEffect(() => {
      let filtered = [...results];

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(
          (issue) =>
            issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            issue.location.endpoint.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by severity
      if (selectedSeverity !== "All") {
        filtered = filtered.filter((issue) => issue.severity === selectedSeverity);
      }

      // Filter by status
      if (selectedStatus !== "All") {
        filtered = filtered.filter((issue) => (issue.status || "Open") === selectedStatus);
      }

      // Sort results
      filtered.sort((a, b) => {
        if (sortBy === "severity") {
          const severityOrder: Record<string, number> = { Critical: 0, High: 1, Medium: 2, Low: 3 };
          return severityOrder[a.severity] - severityOrder[b.severity];
        } else if (sortBy === "status") {
          return (a.status || "Open").localeCompare(b.status || "Open");
        } else if (sortBy === "file") {
          return a.location.endpoint.localeCompare(b.location.endpoint);
        }
        return 0;
      });

      setFilteredResults(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    }, [results, searchTerm, selectedSeverity, selectedStatus, sortBy]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate issue counts
    const counts = {
      critical: results.filter((r) => r.severity === "Critical").length,
      high: results.filter((r) => r.severity === "High").length,
      medium: results.filter((r) => r.severity === "Medium").length,
    };

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case "Critical":
          return "bg-red-600 text-white";
        case "High":
          return "bg-orange-600 text-white";
        case "Medium":
          return "bg-yellow-600 text-white";
        default:
          return "bg-gray-600 text-white";
      }
    };

    const getStatusColor = (status: string) => {
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
    };

    const clearFilters = () => {
      setSearchTerm("");
      setSelectedSeverity("All");
      setSelectedStatus("All");
      setSortBy("severity");
    };

    const hasActiveFilters = searchTerm || selectedSeverity !== "All" || selectedStatus !== "All";

    const projectDetails = [
      {
        label: "Repository",
        value: repo || "Automatisch", // Use dynamic repo name
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
          <TypographyH1 className="mb-8">
            {repo ? `${repo} Security Overview` : 'Project Security Overview'}
          </TypographyH1>

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
                  <TypographySmall className="text-gray-400">Critical</TypographySmall>
                  <TypographyH2>{counts.critical}</TypographyH2>
                </Card>
                <Card>
                  <TypographySmall className="text-gray-400">High</TypographySmall>
                  <TypographyH2>{counts.high}</TypographyH2>
                </Card>
                <Card>
                  <TypographySmall className="text-gray-400">Medium</TypographySmall>
                  <TypographyH2>{counts.medium}</TypographyH2>
                </Card>
              </div>
            </div>

            {/* Recent Issues */}
            <div>
              <TypographyH3 className="mb-4">Recent Issues</TypographyH3>

              {/* Filters */}
              <div className="mb-4 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search issues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 bg-background border rounded flex-1 min-w-[200px]"
                  />

                  {/* Severity Filter */}
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="px-4 py-2 bg-background border rounded "
                  >
                    <option value="All">All Severities</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 bg-background border rounded"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "severity" | "status" | "file")}
                    className="px-4 py-2 bg-background border rounded"
                  >
                    <option value="severity">Sort by Severity</option>
                    <option value="status">Sort by Status</option>
                    <option value="file">Sort by File</option>
                  </select>

                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 border rounded hover:bg-gray-700"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* Results Count */}
                <TypographySmall className="text-gray-400">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredResults.length)} of{" "}
                  {filteredResults.length} issues
                </TypographySmall>
              </div>

              {/* Issues Table */}
              <div className="bg-background rounded-lg overflow-hidden">
                <div className="bg-gray-700 px-4 py-3 grid grid-cols-4 gap-4 text-sm font-medium text-gray-300">
                  <TypographySmall>Issue</TypographySmall>
                  <TypographySmall>Severity</TypographySmall>
                  <TypographySmall>Status</TypographySmall>
                  <TypographySmall>File</TypographySmall>
                </div>

                {currentItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-400">
                    No issues found matching your filters
                  </div>
                ) : (
                  currentItems.map((issue) => (
                    <Link 
                      key={issue.id}
                      to={`/issuedetail/${issue.id}`}
                      className="block"
                    >
                      <div className="px-4 py-3 grid grid-cols-4 gap-4 text-sm border-t border-gray-700 hover:bg-gray-900 cursor-pointer transition-colors">
                        <TypographyP className="hover:text-blue-400">{issue.description}</TypographyP>
                        <div>
                          <span
                            className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              getSeverityColor(issue.severity)
                            )}
                          >
                            {issue.severity}
                          </span>
                        </div>
                        <TypographySmall
                          className={getStatusColor(issue.status ? issue.status : "Open")}
                        >
                          {issue.status ? issue.status : "Open"}
                        </TypographySmall>
                        <TypographyMuted className="truncate text-xs">
                          {issue.location.endpoint + " : " + issue.location.line || "Unknown File"}
                        </TypographyMuted>
                      </div>
                    </Link>
                  ))
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                              "px-3 py-1 border rounded",
                              page === currentPage
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-gray-700"
                            )}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page}>...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default SecurityDashboardPage;
