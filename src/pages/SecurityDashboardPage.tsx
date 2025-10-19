import { TypographyH1, TypographyH2, TypographyH3, TypographyMuted } from "@/components/ui/typography.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { ScanResult } from "@/data/models/scan.ts";
import { scanEndpoints } from "@/data/network/scan.ts";

import ProjectDetailsCard from "@/components/ProjectDetailsCard";
import SummaryGrid from "@/components/SummaryGrid";
import FilterBar from "@/components/FilterBar";
import IssuesTable from "@/components/IssuesTable";
import PaginationControl from "@/components/PaginationControl";

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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
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
		created_at: "",
	},
];

// ...existing code continues (SecurityDashboardPage component unchanged) ...
const SecurityDashboardPage = () => {
	const [results, setResults] = useState<ScanResult[]>([]);
	const { repo } = useParams<{ repo: string }>();

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
			localStorage.setItem("currentRepo", repo);
		}
	}, [repo]);

	// Compute filtered and sorted results immutably with useMemo
	const filteredResults = useMemo(() => {
		let filtered = [...results];

		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(issue) =>
					issue.description.toLowerCase().includes(term) ||
					issue.location.endpoint.toLowerCase().includes(term)
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
			} else if (sortBy === "status") {
				return (a.status || "Open").localeCompare(b.status || "Open");
			} else if (sortBy === "file") {
				return a.location.endpoint.localeCompare(b.location.endpoint);
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
			critical: results.filter((r) => r.severity === "Critical").length,
			high: results.filter((r) => r.severity === "High").length,
			medium: results.filter((r) => r.severity === "Medium").length,
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
					{repo ? `${repo} Security Overview` : "Project Security Overview"}
				</TypographyH1>

				<ProjectDetailsCard repo={repo} />

				<div className="mb-8">
					<TypographyH2>Issues</TypographyH2>
					<TypographyMuted className="mb-6 block">
						View and manage all security issues across your organization.
					</TypographyMuted>

					<div className="mb-6">
						<TypographyH3>Security Posture Score</TypographyH3>
						<TypographyH2 className="text-gray-400">75/100</TypographyH2>
					</div>

					<SummaryGrid counts={counts} />

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

						<IssuesTable items={currentItems} />

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
