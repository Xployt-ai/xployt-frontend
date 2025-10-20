import { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyP, TypographySmall } from "@/components/ui/typography.tsx";
import type { ScanResult, Scan } from "@/data/models/scan";
import { scanCollectionEndpoints } from "@/data/network/scan_collection.ts";
import type { ScanCollection } from "@/data/models/scan_collection.ts";

// Mock data for fallback when API returns empty or fails
const MOCK_SCAN_RESULTS: ScanResult[] = [
  // Automatisch Repository (demo-scan-1) - All 4 severity levels
  {
    id: "1",
    description: "SQL Injection vulnerability in login endpoint",
    severity: "Critical",
    status: "Open",
    location: {endpoint: "/api/auth/login", line: 45},
    scan_id: "demo-scan-1",
    created_at: "2024-07-15T10:30:00Z",
    type: "sast",
    metadata: {}
  },
  {
    id: "2",
    description: "Cross-Site Scripting (XSS) in user profile",
    severity: "Critical",
    status: "Open",
    location: {endpoint: "/api/users/profile", line: 128},
    scan_id: "demo-scan-1",
    created_at: "2024-07-14T14:20:00Z",
    type: "sast",
    metadata: {}
  },
  {
    id: "5",
    description: "CSRF token not validated",
    severity: "High",
    status: "Open",
    location: {endpoint: "/api/payment/process", line: 67},
    scan_id: "demo-scan-1",
    created_at: "2024-07-16T09:15:00Z",
    type: "sast",
    metadata: {}
  },
  {
    id: "9",
    description: "Vulnerable lodash version detected",
    severity: "High",
    status: "Open",
    location: {endpoint: "package.json", line: 12},
    scan_id: "demo-scan-1",
    created_at: "2024-07-14T09:30:00Z",
    type: "dependency",
    metadata: {}
  },
  {
    id: "11",
    description: "AWS Access Key exposed in config file",
    severity: "Medium",
    status: "Open",
    location: {endpoint: "config/aws.js", line: 8},
    scan_id: "demo-scan-1",
    created_at: "2024-07-15T11:45:00Z",
    type: "secret",
    metadata: {}
  },
  {
    id: "16",
    description: "Exposed sensitive port in container",
    severity: "Medium",
    status: "Open",
    location: {endpoint: "docker-compose.yml", line: 34},
    scan_id: "demo-scan-1",
    created_at: "2024-07-15T16:10:00Z",
    type: "container",
    metadata: {}
  },
  {
    id: "8",
    description: "Missing rate limiting on API endpoints",
    severity: "Low",
    status: "Open",
    location: {endpoint: "/api/search", line: 203},
    scan_id: "demo-scan-1",
    created_at: "2024-07-11T13:20:00Z",
    type: "sast",
    metadata: {}
  },
  {
    id: "17",
    description: "Deprecated API method usage",
    severity: "Low",
    status: "Open",
    location: {endpoint: "/utils/helpers.js", line: 89},
    scan_id: "demo-scan-1",
    created_at: "2024-07-15T14:25:00Z",
    type: "sast",
    metadata: {}
  },

  // Webhook Service (demo-scan-2) - All 4 severity levels
  {
    id: "15",
    description: "Outdated base image with vulnerabilities",
    severity: "Critical",
    status: "Open",
    location: {endpoint: "Dockerfile", line: 1},
    scan_id: "demo-scan-2",
    created_at: "2024-07-09T08:45:00Z",
    type: "container",
    metadata: {}
  },
  {
    id: "7",
    description: "Insecure direct object reference in file download",
    severity: "High",
    status: "Open",
    location: {endpoint: "/api/files/download", line: 156},
    scan_id: "demo-scan-2",
    created_at: "2024-07-10T08:45:00Z",
    type: "sast",
    metadata: {}
  },
  {
    id: "12",
    description: "Database password hardcoded in source",
    severity: "High",
    status: "Open",
    location: {endpoint: "db/connection.js", line: 23},
    scan_id: "demo-scan-2",
    created_at: "2024-07-10T10:15:00Z",
    type: "secret",
    metadata: {}
  },
  {
    id: "3",
    description: "Outdated dependency with known vulnerabilities",
    severity: "Medium",
    status: "Resolved",
    location: {endpoint: "package.json", line: 34},
    scan_id: "demo-scan-2",
    created_at: "2024-07-07T12:25:00Z",
    type: "dependency",
    metadata: {}
  },
  {
    id: "18",
    description: "Insecure HTTP connection detected",
    severity: "Medium",
    status: "Open",
    location: {endpoint: "/services/api.js", line: 45},
    scan_id: "demo-scan-2",
    created_at: "2024-07-10T11:30:00Z",
    type: "sast",
    metadata: {}
  },
  {
    id: "19",
    description: "Missing input validation on webhook endpoint",
    severity: "Low",
    status: "Open",
    location: {endpoint: "/api/webhook", line: 78},
    scan_id: "demo-scan-2",
    created_at: "2024-07-10T13:15:00Z",
    type: "sast",
    metadata: {}
  },

  // API Gateway (demo-scan-3) - All 4 severity levels
  {
    id: "10",
    description: "Critical security vulnerability in axios < 0.21.1",
    severity: "Critical",
    status: "Open",
    location: {endpoint: "package.json", line: 18},
    scan_id: "demo-scan-3",
    created_at: "2024-07-13T14:20:00Z",
    type: "dependency",
    metadata: {}
  },
  {
    id: "4",
    description: "Missing authentication on admin endpoint",
    severity: "High",
    status: "Open",
    location: {endpoint: "/api/admin/users", line: 23},
    scan_id: "demo-scan-3",
    created_at: "2024-07-12T16:45:00Z",
    type: "sast",
    metadata: {}
  },
  {
    id: "14",
    description: "Running container as root user",
    severity: "High",
    status: "Open",
    location: {endpoint: "Dockerfile", line: 12},
    scan_id: "demo-scan-3",
    created_at: "2024-07-12T13:20:00Z",
    type: "container",
    metadata: {}
  },
  {
    id: "6",
    description: "Weak password policy implementation",
    severity: "Medium",
    status: "Open",
    location: {endpoint: "/api/auth/register", line: 89},
    scan_id: "demo-scan-3",
    created_at: "2024-07-13T11:30:00Z",
    type: "sast",
    metadata: {}
  },
  {
    id: "13",
    description: "API key found in environment file",
    severity: "Medium",
    status: "Open",
    location: {endpoint: ".env.example", line: 5},
    scan_id: "demo-scan-3",
    created_at: "2024-07-12T15:30:00Z",
    type: "secret",
    metadata: {}
  },
  {
    id: "20",
    description: "Logging sensitive data to console",
    severity: "Low",
    status: "Open",
    location: {endpoint: "/middleware/logger.js", line: 34},
    scan_id: "demo-scan-3",
    created_at: "2024-07-12T17:20:00Z",
    type: "sast",
    metadata: {}
  },
];

const MOCK_SCANS: Scan[] = [
  {
    id: "demo-scan-1",
    repository_name: "automatisch",
    scanner_name: "secret_scanner",
    configurations: {},
    progress_percent: 100,
    progress_text: "Completed",
    user_id: "demo-user",
    created_at: "2024-07-15T10:00:00Z",
    finished_at: "2024-07-15T10:30:00Z"
  },
  {
    id: "demo-scan-2",
    repository_name: "webhook-service",
    scanner_name: "secret_scanner",
    configurations: {},
    progress_percent: 100,
    progress_text: "Completed",
    user_id: "demo-user",
    created_at: "2024-07-10T08:00:00Z",
    finished_at: "2024-07-10T09:00:00Z"
  },
  {
    id: "demo-scan-3",
    repository_name: "api-gateway",
    scanner_name: "secret_scanner",
    configurations: {},
    progress_percent: 100,
    progress_text: "Completed",
    user_id: "demo-user",
    created_at: "2024-07-12T16:00:00Z",
    finished_at: "2024-07-12T17:00:00Z"
  },
];

const SEVERITY_COLORS = {
  Critical: "#dc2626", // red-600
  High: "#ea580c", // orange-600
  Medium: "#ca8a04", // yellow-600
  Low: "#6b7280", // gray-500
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
};

type RepoSummary = {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  open: number;
  resolved: number;
  lastScan?: string;
};

type RepoType = {
  name: string;
  scanId: string; // Add scanId for navigation
  issues: ScanResult[];
  summary: RepoSummary;
};

export default function Reports() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedRepo, setSelectedRepo] = useState<RepoType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scans, setScans] = useState<ScanCollection[]>([]);
  const [scanResults, setScanResults] = useState<Map<string, ScanResult[]>>(new Map());

  useParams();

  // Fetch all scans on mount
  useEffect(() => {
    const fetchScans = async () => {
      try {
        setError(null);

        let scansData: ScanCollection[];
        try {
          scansData = await scanCollectionEndpoints.getUserCollections();
        } catch (apiError) {
          console.error("API error fetching scans:", apiError);
          // Continue with empty array if API fails
          scansData = [];
        }

        // Group collections by repository_name and keep only the latest collection per repository
        const latestMap = new Map<string, ScanCollection>();
        scansData.forEach((c) => {
          const repo = c.repository_name || "Unknown Repository";
          const existing = latestMap.get(repo);
          const curTime = c.created_at ? new Date(c.created_at).getTime() : 0;
          const existingTime = existing && existing.created_at ? new Date(existing.created_at).getTime() : 0;
          if (!existing || curTime > existingTime) {
            latestMap.set(repo, c);
          }
        });

        const latestScans = Array.from(latestMap.values());
        // Keep only the latest scan collections per repository
        setScans(latestScans);

        // Fetch results for each latest collection
        const resultsMap = new Map<string, ScanResult[]>();

        await Promise.allSettled(
          latestScans.map(async (scan) => {
            try {
              // scan.id is the collection_id
              const res = await scanCollectionEndpoints.getCollectionResults(scan.id);

              // Normalize response shapes. Support:
              // - array of vulnerabilities
              // - { vulnerabilities: [] }
              // - { data: [] }
              // - { success: true, data: { vulnerabilities: [] } }
              let payload: any = res;
              if (payload && typeof payload === 'object' && payload.success && payload.data) {
                payload = payload.data;
              }

              let vulnerabilities: ScanResult[] = [];
              if (Array.isArray(payload)) {
                vulnerabilities = payload as ScanResult[];
              } else if (payload && Array.isArray(payload.vulnerabilities)) {
                vulnerabilities = payload.vulnerabilities as ScanResult[];
              } else if (payload && Array.isArray(payload.data)) {
                vulnerabilities = payload.data as ScanResult[];
              } else if (res && Array.isArray((res as any).vulnerabilities)) {
                vulnerabilities = (res as any).vulnerabilities as ScanResult[];
              }

              resultsMap.set(scan.id, vulnerabilities || []);
            } catch (err) {
              console.error(`Failed to fetch results for collection ${scan.id}:`, err);
              resultsMap.set(scan.id, []);
            }
          })
        );

        // Always add mock scan results (demo) so the UI has something to show
        MOCK_SCANS.forEach(scan => {
          const mockResults = MOCK_SCAN_RESULTS.filter(r => r.scan_id === scan.id);
          resultsMap.set(scan.id, mockResults);
        });

        setScanResults(resultsMap);
      } catch (err) {
        console.error("Failed to fetch scans:", err);
        // Use mock data on error
        const resultsMap = new Map<string, ScanResult[]>();
        MOCK_SCANS.forEach(scan => {
          const mockResults = MOCK_SCAN_RESULTS.filter(r => r.scan_id === scan.id);
          resultsMap.set(scan.id, mockResults);
        });
        // setScans to empty or mock fallback (typed as ScanCollection[])
        setScans([]);
        setScanResults(resultsMap);
        setError("Failed to load scan reports. Showing demo data.");
      }
    };

    fetchScans();
  }, []);

  const repos = useMemo<RepoType[]>(() => {
    const map = new Map<string, ScanResult[]>();
    const scanIdMap = new Map<string, string>(); // Track the latest scan_id for each repo

    // Group results by repository name from scans
    scans.forEach((scan) => {
      const repoName = scan.repository_name || "Unknown Repository";
      const results = scanResults.get(scan.id) || [];

      if (!map.has(repoName)) {
        map.set(repoName, []);
        scanIdMap.set(repoName, scan.id); // Store the first (or latest) scan_id
      }
      map.get(repoName)!.push(...results);
    });

    return Array.from(map.entries()).map(([name, issues]) => {
      // normalize severity casing and count
      let critical = 0;
      let high = 0;
      let medium = 0;
      let low = 0;
      issues.forEach((i) => {
        const sev = (i.severity || "").toString().trim().toLowerCase();
        if (sev === "critical") critical += 1;
        else if (sev === "high") high += 1;
        else if (sev === "medium") medium += 1;
        else if (sev === "low") low += 1;
      });
      const open = issues.filter((i) => (i.status || "").toString().toLowerCase() === "open").length;
      const resolved = issues.filter((i) => (i.status || "").toString().toLowerCase() === "resolved").length;
      const lastScan = issues[0]?.created_at;

      return {
        name,
        scanId: scanIdMap.get(name) || "", // Add scanId to the return object
        issues,
        summary: {
          total: issues.length,
          critical,
          high,
          medium,
          low,
          open,
          resolved,
          lastScan,
        },
      };
    });
  }, [scans, scanResults]);

  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity = severityFilter === "all" ||
        (severityFilter === "critical" && repo.summary.critical > 0) ||
        (severityFilter === "high" && repo.summary.high > 0) ||
        (severityFilter === "medium" && repo.summary.medium > 0) ||
        (severityFilter === "low" && repo.summary.low > 0);
      return matchesSearch && matchesSeverity;
    });
  }, [repos, searchQuery, severityFilter]);

  const getHighestSeverity = (summary: RepoSummary) => {
    if (summary.critical > 0) return 'Critical';
    if (summary.high > 0) return 'High';
    if (summary.medium > 0) return 'Medium';
    if (summary.low > 0) return 'Low';
    return 'Clean';
  };

  const getSeverityData = (summary: RepoSummary) => {
    // Return all severities in a fixed order with numeric values so charts render consistently
    const critical = Number(summary.critical || 0);
    const high = Number(summary.high || 0);
    const medium = Number(summary.medium || 0);
    const low = Number(summary.low || 0);

    const data = [
      { name: 'Critical', value: critical, color: SEVERITY_COLORS.Critical },
      { name: 'High', value: high, color: SEVERITY_COLORS.High },
      { name: 'Medium', value: medium, color: SEVERITY_COLORS.Medium },
      { name: 'Low', value: low, color: SEVERITY_COLORS.Low },
    ];

    const total = critical + high + medium + low;
    // If there are no vulnerabilities, return a single 'Clean' slice so the chart renders.
    if (total === 0) {
      return [{ name: 'Clean', value: 1, color: SEVERITY_COLORS.Low }];
    }

    return data; // return all severities (values may be zero)
  };

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-4xl mx-auto mt-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold   ">Repository Security Reports</h2>
          <p className="text-gray-400">Overview of security scans and vulnerabilities across all repositories</p>
        </div>

        {/* Error State */}
        {error && (
          <Card className="p-12 text-center bg-background border border-red-900">
            <div className="text-red-500 text-5xl mb-4">⚠</div>
            <TypographyH2 className="mb-2 text-red-400">Error Loading Reports</TypographyH2>
            <TypographyP className="text-gray-400 mb-4">{error}</TypographyP>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-background hover:bg-gray-800 text-white rounded-md transition-colors font-medium"
            >
              Retry
            </button>
          </Card>
        )}

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-gray-600  text-white"
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-[200px] border border-gray-600 bg-background text-gray-300 px-3 py-2 rounded"
            >
              <option value="all">All Severities</option>
              <option value="critical">Has Critical</option>
              <option value="high">Has High</option>
              <option value="medium">Has Medium</option>
              <option value="low">Has Low</option>
            </select>
          </div>
        </div>

        {/* Repository Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredRepos.map((repo, index) => {
            const highestSeverity = getHighestSeverity(repo.summary);
            const severityData = getSeverityData(repo.summary);

            return (
              <Card
                key={repo.name}
                className="p-6 bg-background border border-gray-600 hover:border-primary/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-primary/10 hover:scale-[1.03] group animate-fade-in"
                style={{animationDelay: `${index * 150}ms`}}
                onClick={() => setSelectedRepo(repo)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-shrink-0 w-5 h-5">
                        <img
                          src="/FolderNoBG.png"
                          alt="Repository folder icon"
                          className="w-full h-full object-contain group-hover:scale-110 transition-all duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <h2
                        className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">{repo.name}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-3 h-3 group-hover:scale-110 transition-transform duration-300"/>
                      <span>{formatDate(repo.summary.lastScan)}</span>
                    </div>
                  </div>
                  <ChevronRight
                    className="w-5 h-5 text-gray-500 group-hover:text-primary group-hover:translate-x-2 transition-all duration-300"/>
                </div>

                {/* Severity Chart with Legend */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-gray-400 mb-3 text-center">SEVERITY DISTRIBUTION</div>
                  <div className="flex items-center gap-6">
                    {/* Pie Chart - Left Side */}
                    <div className="flex-shrink-0" style={{width: '180px', height: '180px'}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={severityData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={70}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {severityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color}/>
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend Details - Right Side */}
                    <div className="flex-1 space-y-3">
                      <div className="text-center mb-4">
                        <div
                          className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">{repo.summary.total}</div>
                        <TypographySmall className="text-gray-400">Total Issues</TypographySmall>
                      </div>

                      <div className="space-y-2">
                        {repo.summary.critical > 0 && (
                          <div
                            className="flex items-center justify-between p-2 rounded bg-red-950/20 border border-red-900/30 hover:bg-red-950/40 hover:border-red-800/50 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform duration-300"
                                style={{backgroundColor: SEVERITY_COLORS.Critical}}/>
                              <span className="text-sm font-medium text-gray-200">Critical</span>
                            </div>
                            <span className="text-lg font-bold text-white">{repo.summary.critical}</span>
                          </div>
                        )}
                        {repo.summary.high > 0 && (
                          <div
                            className="flex items-center justify-between p-2 rounded bg-orange-950/20 border border-orange-900/30 hover:bg-orange-950/40 hover:border-orange-800/50 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform duration-300"
                                style={{backgroundColor: SEVERITY_COLORS.High}}/>
                              <span className="text-sm font-medium text-gray-200">High</span>
                            </div>
                            <span className="text-lg font-bold text-white">{repo.summary.high}</span>
                          </div>
                        )}
                        {repo.summary.medium > 0 && (
                          <div
                            className="flex items-center justify-between p-2 rounded bg-yellow-950/20 border border-yellow-900/30 hover:bg-yellow-950/40 hover:border-yellow-800/50 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform duration-300"
                                style={{backgroundColor: SEVERITY_COLORS.Medium}}/>
                              <span className="text-sm font-medium text-gray-200">Medium</span>
                            </div>
                            <span className="text-lg font-bold text-white">{repo.summary.medium}</span>
                          </div>
                        )}
                        {repo.summary.low > 0 && (
                          <div
                            className="flex items-center justify-between p-2 rounded bg-gray-900/30 border border-gray-700/30 hover:bg-gray-900/60 hover:border-gray-600/50 transition-all duration-300 hover:scale-105">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform duration-300"
                                style={{backgroundColor: SEVERITY_COLORS.Low}}/>
                              <span className="text-sm font-medium text-gray-200">Low</span>
                            </div>
                            <span className="text-lg font-bold text-white">{repo.summary.low}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-600">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3"/>
                    <span>Needs Review</span>
                  </div>
                  <div className="px-3 py-1 bg-gray-800 text-white text-xs font-medium rounded-full">
                    {highestSeverity}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredRepos.length === 0 && (
          <Card className="p-12 text-center bg-background border border-gray-600">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <img
                src="/FolderNoBG.png"
                alt="Repository folder icon"
                className="w-full h-full object-contain opacity-50"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <TypographyH2 className="mb-2 text-gray-300">No repositories found</TypographyH2>
            <TypographyP className="text-gray-400">Try adjusting your filters or search query</TypographyP>
          </Card>
        )}

        {/* Repository Detail Modal */}
        {selectedRepo && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedRepo(null)}
          >
            <Card
              className="p-6 max-w-3xl w-full bg-background border border-gray-600 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex-shrink-0 w-5 h-5">
                      <img
                        src="/FolderNoBG.png"
                        alt="Repository folder icon"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <TypographyH2 className="mb-0 text-2xl">{selectedRepo.name}</TypographyH2>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4"/>
                    <span>Last scanned {formatDate(selectedRepo.summary.lastScan)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRepo(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Charts in Modal */}
              <div className="mb-4">
                <Card className="p-4 bg-background border border-gray-600">
                  <TypographySmall className="font-semibold text-gray-300 mb-3 text-xs">SEVERITY
                    DISTRIBUTION</TypographySmall>
                  <div className="flex items-center gap-6">
                    {/* Pie Chart - Left Side */}
                    <div className="flex-shrink-0" style={{width: '200px', height: '200px'}}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getSeverityData(selectedRepo.summary)}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="value"
                          >
                            {getSeverityData(selectedRepo.summary).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color}/>
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend Details - Right Side */}
                    <div className="flex-1 space-y-2">
                      <div className="text-center mb-3">
                        <div className="text-4xl font-bold text-white">{selectedRepo.summary.total}</div>
                        <TypographyP className="text-gray-400 text-sm mt-1">Total Vulnerabilities</TypographyP>
                      </div>

                      <div className="space-y-2">
                        {selectedRepo.summary.critical > 0 && (
                          <div
                            className="flex items-center justify-between p-2 rounded bg-red-950/30 border border-red-900/50 hover:bg-red-950/50 hover:border-red-800/70 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full hover:scale-125 transition-transform duration-300"
                                   style={{backgroundColor: SEVERITY_COLORS.Critical}}/>
                              <span className="text-sm font-semibold text-gray-100">Critical</span>
                            </div>
                            <span className="text-xl font-bold text-white">{selectedRepo.summary.critical}</span>
                          </div>
                        )}
                        {selectedRepo.summary.high > 0 && (
                          <div
                            className="flex items-center justify-between p-2 rounded bg-orange-950/30 border border-orange-900/50 hover:bg-orange-950/50 hover:border-orange-800/70 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full hover:scale-125 transition-transform duration-300"
                                   style={{backgroundColor: SEVERITY_COLORS.High}}/>
                              <span className="text-sm font-semibold text-gray-100">High</span>
                            </div>
                            <span className="text-xl font-bold text-white">{selectedRepo.summary.high}</span>
                          </div>
                        )}
                        {selectedRepo.summary.medium > 0 && (
                          <div
                            className="flex items-center justify-between p-2 rounded bg-yellow-950/30 border border-yellow-900/50 hover:bg-yellow-950/50 hover:border-yellow-800/70 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full hover:scale-125 transition-transform duration-300"
                                   style={{backgroundColor: SEVERITY_COLORS.Medium}}/>
                              <span className="text-sm font-semibold text-gray-100">Medium</span>
                            </div>
                            <span className="text-xl font-bold text-white">{selectedRepo.summary.medium}</span>
                          </div>
                        )}
                        {selectedRepo.summary.low > 0 && (
                          <div
                            className="flex items-center justify-between p-2 rounded bg-gray-900/40 border border-gray-700/50 hover:bg-gray-900/70 hover:border-gray-600/70 hover:scale-105 transition-all duration-300 cursor-pointer">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full hover:scale-125 transition-transform duration-300"
                                   style={{backgroundColor: SEVERITY_COLORS.Low}}/>
                              <span className="text-sm font-semibold text-gray-100">Low</span>
                            </div>
                            <span className="text-xl font-bold text-white">{selectedRepo.summary.low}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <Card
                  className="p-3 bg-background border border-gray-600 hover:border-primary/50 hover:scale-105 transition-all duration-300">
                  <TypographySmall className="text-gray-400 mb-0.5 text-xs">Total Issues</TypographySmall>
                  <div className="text-xl font-bold text-white">{selectedRepo.summary.total}</div>
                </Card>
                <Card
                  className="p-3 bg-background border border-gray-600 hover:border-red-500/50 hover:scale-105 transition-all duration-300">
                  <TypographySmall className="text-gray-400 mb-0.5 text-xs">Critical</TypographySmall>
                  <div className="text-xl font-bold text-white">{selectedRepo.summary.critical}</div>
                </Card>
                <Card
                  className="p-3 bg-background border border-gray-600 hover:border-blue-500/50 hover:scale-105 transition-all duration-300">
                  <TypographySmall className="text-gray-400 mb-0.5 text-xs">Open</TypographySmall>
                  <div className="text-xl font-bold text-white">{selectedRepo.summary.open}</div>
                </Card>
                <Card
                  className="p-3 bg-background border border-gray-600 hover:border-green-500/50 hover:scale-105 transition-all duration-300">
                  <TypographySmall className="text-gray-400 mb-0.5 text-xs">Resolved</TypographySmall>
                  <div className="text-xl font-bold text-white">{selectedRepo.summary.resolved}</div>
                </Card>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/securitydashboard/${selectedRepo.scanId}`)}
                  className="flex-1 bg-gray-900 hover:bg-primary hover:scale-105 text-white px-3 py-2 rounded-md transition-all duration-300 font-medium text-sm"
                >
                  View All Issues
                </button>
                <button
                  className="flex-1 border border-gray-600 hover:bg-background hover:border-primary/50 hover:scale-105 text-white px-3 py-2 rounded-md transition-all duration-300 font-medium text-sm">
                  Download Report
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

