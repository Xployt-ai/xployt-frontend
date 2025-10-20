import { useMemo, useState, useEffect } from "react";
import { GitBranch, Calendar, ChevronRight, Clock } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyP, TypographySmall } from "@/components/ui/typography.tsx";
import type { ScanResult, Scan } from "@/data/models/scan";
import { scanEndpoints } from "@/data/network/scan";

// Mock data for fallback when API returns empty or fails
const MOCK_SCAN_RESULTS: ScanResult[] = [
  { id: "1", description: "SQL Injection vulnerability in login endpoint", severity: "Critical", status: "Open", location: { endpoint: "/api/auth/login", line: 45 }, scan_id: "demo-scan-1", created_at: "2024-07-15T10:30:00Z", type: "sast", metadata: {} },
  { id: "2", description: "Cross-Site Scripting (XSS) in user profile", severity: "Critical", status: "Open", location: { endpoint: "/api/users/profile", line: 128 }, scan_id: "demo-scan-1", created_at: "2024-07-14T14:20:00Z", type: "sast", metadata: {} },
  { id: "3", description: "Outdated dependency with known vulnerabilities", severity: "Medium", status: "Resolved", location: { endpoint: "package.json", line: 34 }, scan_id: "demo-scan-2", created_at: "2024-07-07T12:25:00Z", type: "dependency", metadata: {} },
  { id: "4", description: "Missing authentication on admin endpoint", severity: "High", status: "Open", location: { endpoint: "/api/admin/users", line: 23 }, scan_id: "demo-scan-3", created_at: "2024-07-12T16:45:00Z", type: "sast", metadata: {} },
  { id: "5", description: "CSRF token not validated", severity: "Critical", status: "Open", location: { endpoint: "/api/payment/process", line: 67 }, scan_id: "demo-scan-1", created_at: "2024-07-16T09:15:00Z", type: "sast", metadata: {} },
  { id: "6", description: "Weak password policy implementation", severity: "Medium", status: "Open", location: { endpoint: "/api/auth/register", line: 89 }, scan_id: "demo-scan-3", created_at: "2024-07-13T11:30:00Z", type: "sast", metadata: {} },
  { id: "7", description: "Insecure direct object reference in file download", severity: "High", status: "Open", location: { endpoint: "/api/files/download", line: 156 }, scan_id: "demo-scan-2", created_at: "2024-07-10T08:45:00Z", type: "sast", metadata: {} },
  { id: "8", description: "Missing rate limiting on API endpoints", severity: "Low", status: "Open", location: { endpoint: "/api/search", line: 203 }, scan_id: "demo-scan-1", created_at: "2024-07-11T13:20:00Z", type: "sast", metadata: {} },
];

const MOCK_SCANS: Scan[] = [
  { id: "demo-scan-1", repository_name: "automatisch", scanner_name: "secret_scanner", configurations: {}, progress_percent: 100, progress_text: "Completed", user_id: "demo-user", created_at: "2024-07-15T10:00:00Z", finished_at: "2024-07-15T10:30:00Z" },
  { id: "demo-scan-2", repository_name: "webhook-service", scanner_name: "secret_scanner", configurations: {}, progress_percent: 100, progress_text: "Completed", user_id: "demo-user", created_at: "2024-07-10T08:00:00Z", finished_at: "2024-07-10T09:00:00Z" },
  { id: "demo-scan-3", repository_name: "api-gateway", scanner_name: "secret_scanner", configurations: {}, progress_percent: 100, progress_text: "Completed", user_id: "demo-user", created_at: "2024-07-12T16:00:00Z", finished_at: "2024-07-12T17:00:00Z" },
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
  issues: ScanResult[];
  summary: RepoSummary;
};

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedRepo, setSelectedRepo] = useState<RepoType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scans, setScans] = useState<Scan[]>([]);
  const [scanResults, setScanResults] = useState<Map<string, ScanResult[]>>(new Map());

  // Fetch all scans on mount
  useEffect(() => {
    const fetchScans = async () => {
      try {
        setLoading(true);
        setError(null);
        const scansData = await scanEndpoints.listScans();
        
        // Always include mock data alongside real data
        const finalScans = [...scansData, ...MOCK_SCANS];
        setScans(finalScans);

        // Fetch results for each scan
        const resultsMap = new Map<string, ScanResult[]>();
        
        // Fetch results for real scans
        await Promise.all(
          scansData.map(async (scan) => {
            try {
              const results = await scanEndpoints.getScanResults(scan.id);
              resultsMap.set(scan.id, results.length > 0 ? results : []);
            } catch (err) {
              console.error(`Failed to fetch results for scan ${scan.id}:`, err);
              resultsMap.set(scan.id, []);
            }
          })
        );
        
        // Always add mock scan results
        MOCK_SCANS.forEach(scan => {
          const mockResults = MOCK_SCAN_RESULTS.filter(r => r.scan_id === scan.id);
          resultsMap.set(scan.id, mockResults);
        });
        
        setScanResults(resultsMap);
      } catch (err) {
        console.error("Failed to fetch scans:", err);
        // Use mock data on error
        setScans(MOCK_SCANS);
        const resultsMap = new Map<string, ScanResult[]>();
        MOCK_SCANS.forEach(scan => {
          const mockResults = MOCK_SCAN_RESULTS.filter(r => r.scan_id === scan.id);
          resultsMap.set(scan.id, mockResults);
        });
        setScanResults(resultsMap);
        setError("Failed to load scan reports. Showing demo data.");
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const repos = useMemo<RepoType[]>(() => {
    const map = new Map<string, ScanResult[]>();
    
    // Group results by repository name from scans
    scans.forEach((scan) => {
      const repoName = scan.repository_name;
      const results = scanResults.get(scan.id) || [];
      
      if (!map.has(repoName)) {
        map.set(repoName, []);
      }
      map.get(repoName)!.push(...results);
    });

    return Array.from(map.entries()).map(([name, issues]) => {
      const critical = issues.filter((i) => i.severity === "Critical").length;
      const high = issues.filter((i) => i.severity === "High").length;
      const medium = issues.filter((i) => i.severity === "Medium").length;
      const low = issues.filter((i) => i.severity === "Low").length;
      const open = issues.filter((i) => i.status === "Open").length;
      const resolved = issues.filter((i) => i.status === "Resolved").length;
      const lastScan = issues[0]?.created_at;

      return {
        name,
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
    const data = [];
    if (summary.critical > 0) data.push({ name: 'Critical', value: summary.critical, color: SEVERITY_COLORS.Critical });
    if (summary.high > 0) data.push({ name: 'High', value: summary.high, color: SEVERITY_COLORS.High });
    if (summary.medium > 0) data.push({ name: 'Medium', value: summary.medium, color: SEVERITY_COLORS.Medium });
    if (summary.low > 0) data.push({ name: 'Low', value: summary.low, color: SEVERITY_COLORS.Low });
    return data;
  };

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold   ">Repository Security Reports</h2>
          <p className="text-gray-400">Overview of security scans and vulnerabilities across all repositories</p>
        </div>

        {/* Loading State */}
        {loading && (
          <Card className="p-12 text-center bg-background border-0 ">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4"></div>
            <TypographyP className="text-gray-400">Loading scan reports...</TypographyP>
          </Card>
        )}

        {/* Error State */}
        {error && !loading && (
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

        {/* Content - Only show when not loading and no error */}
        {!loading && !error && (
          <>
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
                className="p-6 bg-background border border-gray-600 hover:border-gray-500 transition-all cursor-pointer hover:shadow-xl hover:scale-[1.02] group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => setSelectedRepo(repo)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <GitBranch className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors" />
                      <h2 className="text-2xl font-semibold">{repo.name}</h2>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(repo.summary.lastScan)}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                </div>

                {/* Severity Chart with Legend */}
                <div className="mb-6">
                  <div className="text-xs font-medium text-gray-400 mb-3 text-center">SEVERITY DISTRIBUTION</div>
                  <div className="flex items-center gap-6">
                    {/* Pie Chart - Left Side */}
                    <div className="flex-shrink-0" style={{ width: '180px', height: '180px' }}>
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
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend Details - Right Side */}
                    <div className="flex-1 space-y-3">
                      <div className="text-center mb-4">
                        <div className="text-3xl font-bold text-white">{repo.summary.total}</div>
                        <TypographySmall className="text-gray-400">Total Issues</TypographySmall>
                      </div>
                      
                      <div className="space-y-2">
                        {repo.summary.critical > 0 && (
                          <div className="flex items-center justify-between p-2 rounded bg-red-950/20 border border-red-900/30">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SEVERITY_COLORS.Critical }} />
                              <span className="text-sm font-medium text-gray-200">Critical</span>
                            </div>
                            <span className="text-lg font-bold text-white">{repo.summary.critical}</span>
                          </div>
                        )}
                        {repo.summary.high > 0 && (
                          <div className="flex items-center justify-between p-2 rounded bg-orange-950/20 border border-orange-900/30">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SEVERITY_COLORS.High }} />
                              <span className="text-sm font-medium text-gray-200">High</span>
                            </div>
                            <span className="text-lg font-bold text-white">{repo.summary.high}</span>
                          </div>
                        )}
                        {repo.summary.medium > 0 && (
                          <div className="flex items-center justify-between p-2 rounded bg-yellow-950/20 border border-yellow-900/30">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SEVERITY_COLORS.Medium }} />
                              <span className="text-sm font-medium text-gray-200">Medium</span>
                            </div>
                            <span className="text-lg font-bold text-white">{repo.summary.medium}</span>
                          </div>
                        )}
                        {repo.summary.low > 0 && (
                          <div className="flex items-center justify-between p-2 rounded bg-gray-900/30 border border-gray-700/30">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SEVERITY_COLORS.Low }} />
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
                    <Clock className="w-3 h-3" />
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
            <GitBranch className="w-12 h-12 text-gray-500 mx-auto mb-4" />
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
              className="p-6 max-w-4xl w-full bg-background border border-gray-600 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <GitBranch className="w-6 h-6 text-gray-400" />
                    <TypographyH2 className="mb-0">{selectedRepo.name}</TypographyH2>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
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
              <div className="mb-8">
                <Card className="p-6 bg-background border border-gray-600">
                  <TypographySmall className="font-semibold text-gray-300 mb-4">SEVERITY DISTRIBUTION</TypographySmall>
                  <div className="flex items-center gap-8">
                    {/* Pie Chart - Left Side */}
                    <div className="flex-shrink-0" style={{ width: '250px', height: '250px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={getSeverityData(selectedRepo.summary)}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {getSeverityData(selectedRepo.summary).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legend Details - Right Side */}
                    <div className="flex-1 space-y-3">
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-white">{selectedRepo.summary.total}</div>
                        <TypographyP className="text-gray-400 mt-2">Total Vulnerabilities</TypographyP>
                      </div>
                      
                      <div className="space-y-3">
                        {selectedRepo.summary.critical > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-red-950/30 border border-red-900/50">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: SEVERITY_COLORS.Critical }} />
                              <span className="text-base font-semibold text-gray-100">Critical</span>
                            </div>
                            <span className="text-2xl font-bold text-white">{selectedRepo.summary.critical}</span>
                          </div>
                        )}
                        {selectedRepo.summary.high > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-orange-950/30 border border-orange-900/50">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: SEVERITY_COLORS.High }} />
                              <span className="text-base font-semibold text-gray-100">High</span>
                            </div>
                            <span className="text-2xl font-bold text-white">{selectedRepo.summary.high}</span>
                          </div>
                        )}
                        {selectedRepo.summary.medium > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-950/30 border border-yellow-900/50">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: SEVERITY_COLORS.Medium }} />
                              <span className="text-base font-semibold text-gray-100">Medium</span>
                            </div>
                            <span className="text-2xl font-bold text-white">{selectedRepo.summary.medium}</span>
                          </div>
                        )}
                        {selectedRepo.summary.low > 0 && (
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-900/40 border border-gray-700/50">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: SEVERITY_COLORS.Low }} />
                              <span className="text-base font-semibold text-gray-100">Low</span>
                            </div>
                            <span className="text-2xl font-bold text-white">{selectedRepo.summary.low}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <Card className="p-4 bg-background border border-gray-600">
                  <TypographySmall className="text-gray-400 mb-1">Total Issues</TypographySmall>
                  <div className="text-2xl font-bold text-white">{selectedRepo.summary.total}</div>
                </Card>
                <Card className="p-4 bg-background border border-gray-600">
                  <TypographySmall className="text-gray-400 mb-1">Critical</TypographySmall>
                  <div className="text-2xl font-bold text-white">{selectedRepo.summary.critical}</div>
                </Card>
                <Card className="p-4 bg-background border border-gray-600">
                  <TypographySmall className="text-gray-400 mb-1">Open</TypographySmall>
                  <div className="text-2xl font-bold text-white">{selectedRepo.summary.open}</div>
                </Card>
                <Card className="p-4 bg-background border border-gray-600">
                  <TypographySmall className="text-gray-400 mb-1">Resolved</TypographySmall>
                  <div className="text-2xl font-bold text-white">{selectedRepo.summary.resolved}</div>
                </Card>
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-md transition-colors font-medium">
                  View All Issues
                </button>
                <button className="flex-1 border border-gray-600 hover:bg-background text-white px-4 py-3 rounded-md transition-colors font-medium">
                  Download Report
                </button>
              </div>
            </Card>
          </div>
        )}
        </>
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
