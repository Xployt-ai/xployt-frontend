import { Link, useParams, useNavigate } from "react-router-dom"; 
import { CodeBlock } from "@/components/CodeBlock.tsx";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils.ts";
import { useEffect, useState } from "react";
import type { ScanResult } from "@/data/models/scan.ts";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyMuted,
  TypographyP,
  TypographySmall
} from "@/components/ui/typography.tsx";

// Import the same dummy data as SecurityDashboardPage
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
    created_at: "2024-07-15T10:30:00Z"
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
    created_at: "2024-07-14T14:20:00Z"
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
    created_at: "2024-07-13T09:15:00Z"
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
    created_at: "2024-07-12T16:45:00Z"
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
    created_at: "2024-07-11T11:30:00Z"
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
    created_at: "2024-07-10T13:20:00Z"
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
    created_at: "2024-07-09T08:50:00Z"
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
    created_at: "2024-07-08T15:40:00Z"
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
    created_at: "2024-07-07T12:25:00Z"
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
    created_at: "2024-07-06T17:10:00Z"
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
    created_at: "2024-07-05T10:15:00Z"
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
    created_at: "2024-07-04T14:35:00Z"
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
    created_at: "2024-07-03T09:45:00Z"
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
    created_at: "2024-07-02T16:20:00Z"
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
    created_at: "2024-07-01T11:55:00Z"
  }
];

const IssueDetail = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const navigate = useNavigate();
  const [issue, setIssue] = useState<ScanResult | null>(null);

  // Try to get repo from localStorage or default
  const [repo, setRepo] = useState<string>("");

  useEffect(() => {
    // Get repo from localStorage or use default
    const storedRepo = localStorage.getItem('currentRepo') || 'automatisch';
    setRepo(storedRepo);
  }, []);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        // Try to find issue in dummy data first
        const foundIssue = DUMMY_SCAN_RESULTS.find(item => item.id === issueId);
        if (foundIssue) {
          setIssue(foundIssue);
        } else {
          setIssue(null);
        }
      } catch (error) {
        console.error("Failed to fetch issue:", error);
        setIssue(null);
      }
    };

    if (issueId) {
      fetchIssue();
    }
  }, [issueId]);

  // Colored severity styling for better visual scanning
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-600 text-white border border-red-700 rounded-full";
      case "High":
        return "bg-orange-600 text-white border border-orange-700 rounded-full ";
      case "Medium":
        return "bg-yellow-500 text-black border border-yellow-600 rounded-full";
      default:
        return "bg-gray-600 text-white border border-gray-700 rounded-full";
    }
  };

  // Monochrome status styling - using only grays
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "text-gray-300";
      case "Resolved":
        return "text-gray-500";
      case "In Progress":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBackToDashboard = () => {
    navigate(`/securitydashboard/${repo}`);
  };

  const handleMarkAsResolved = () => {
    if (issue) {
      setIssue({ ...issue, status: "Resolved" });
      console.log(`Marking issue ${issue.id} as resolved`);
    }
  };

  const getCodeSnippet = (issue: ScanResult) => {
    if (issue.description.toLowerCase().includes("sql injection")) {
      return `// Vulnerable Code (${issue.location.endpoint}:${issue.location.line}):
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // VULNERABLE: Direct string concatenation
  const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  
  db.query(query, (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});`;
    } else if (issue.description.toLowerCase().includes("xss")) {
      return `// Vulnerable Code (${issue.location.endpoint}:${issue.location.line}):
app.get('/profile', (req, res) => {
  const { name } = req.query;
  
  // VULNERABLE: Direct output without sanitization
  const html = '<h1>Welcome, ' + name + '!</h1>';
  
  res.send(html);
});`;
    } else if (issue.description.toLowerCase().includes("cors")) {
      return `// Vulnerable Code (${issue.location.endpoint}:${issue.location.line}):
app.use(cors({
  // VULNERABLE: Allows all origins
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`;
    } else {
      return `// Vulnerable Code (${issue.location.endpoint}:${issue.location.line}):
// Issue: ${issue.description}
// Location: ${issue.location.endpoint} at line ${issue.location.line}
// 
// This code snippet would contain the actual vulnerable code
// from your repository that needs to be reviewed and fixed.`;
    }
  };

  const getFixGuidance = (issue: ScanResult) => {
    if (issue.description.toLowerCase().includes("sql injection")) {
      return {
        description: "To mitigate this vulnerability, use parameterized queries or prepared statements. These methods ensure that user-supplied data is treated as parameters rather than executable SQL code.",
        fixedCode: `// Fixed Code:
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // SECURE: Using parameterized query
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, user: results[0] });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});`
      };
    } else if (issue.description.toLowerCase().includes("xss")) {
      return {
        description: "To prevent XSS attacks, always sanitize and escape user input before displaying it. Use proper templating engines and Content Security Policy headers.",
        fixedCode: `// Fixed Code:
const escapeHtml = require('escape-html');

app.get('/profile', (req, res) => {
  const { name } = req.query;
  
  // SECURE: Sanitize user input
  const safeName = escapeHtml(name || 'Guest');
  const html = '<h1>Welcome, ' + safeName + '!</h1>';
  
  res.send(html);
});`
      };
    } else if (issue.description.toLowerCase().includes("cors")) {
      return {
        description: "Configure CORS properly by specifying allowed origins, methods, and headers. Avoid using wildcards in production environments.",
        fixedCode: `// Fixed Code:
app.use(cors({
  // SECURE: Specify allowed origins
  origin: ['https://yourdomain.com', 'https://app.yourdomain.com'],
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`
      };
    } else {
      return {
        description: `Please review the security issue at ${issue.location.endpoint}:${issue.location.line} and follow security best practices to resolve this ${issue.severity.toLowerCase()} priority issue. Consider consulting with your security team for proper remediation.`,
        fixedCode: null
      };
    }
  };

  if (!issue) {
    return (
      <div className="p-8 bg-black text-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center min-h-[400px] flex flex-col justify-center">
            <div className="mb-8">
              <div className="text-6xl mb-4 text-gray-600">□</div>
              <TypographyH1 className="mb-4">Issue Not Found</TypographyH1>
              <TypographyP className="mb-6 text-gray-500">
                The requested issue #{issueId} could not be found or may have been removed.
              </TypographyP>
            </div>
            <div className="flex gap-4 justify-center">
              <Link 
                to={`/securitydashboard/${repo}`}
                className="px-6 py-3 bg-gray-900 text-white border border-gray-800 hover:bg-gray-800 transition-colors"
              >
                Back to Security Dashboard
              </Link>
              <Link 
                to="/"
                className="px-6 py-3 border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const fixGuidance = getFixGuidance(issue);

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <TypographySmall className="text-gray-500 space-x-1">
            <Link to="/" className="text-gray-500 hover:text-gray-300 transition-colors border-b border-transparent hover:border-gray-500">
              Projects
            </Link>
            <span>/</span>
            <Link 
              to={`/securitydashboard/${repo}`} 
              className="text-gray-500 hover:text-gray-300 transition-colors border-b border-transparent hover:border-gray-500"
            >
              {repo} Security Dashboard
            </Link>
            <span>/</span>
            <span className="text-gray-300">Issue #{issue.id}</span>
          </TypographySmall>
        </div>

        {/* Header */}
        <div className="mb-12">
          <TypographyH1 className="mb-4">
            {issue.description}
          </TypographyH1>

          <div className="flex items-center gap-4 mb-4">
            <span className={cn("px-3 py-1 text-sm", getSeverityColor(issue.severity))}>
              {issue.severity.toUpperCase()}
            </span>
            <span className={cn("text-sm", getStatusColor(issue.status || "Open"))}>
              ● {(issue.status || "Open").toUpperCase()}
            </span>
            <TypographyMuted className="text-gray-500">#{issue.id}</TypographyMuted>
          </div>

          <TypographyMuted className="text-gray-600">
            Found in {issue.location.endpoint} at line {issue.location.line} • Created {formatDate(issue.created_at)}
          </TypographyMuted>
        </div>

        {/* Issue Details */}
        <div className="mb-12">
          <TypographyH2 className="mb-6 text-gray-300 ">Issue Details</TypographyH2>
          <div className="flex flex-wrap items-center gap-8 p-6  border border-gray-800 rounded">
            <div className="flex-1 min-w-[120px]">
              <TypographySmall className="text-gray-500 uppercase mb-1">Status</TypographySmall>
              <TypographyP className={cn("font-medium", getStatusColor(issue.status || "Open"))}>
                {issue.status || "Open"}
              </TypographyP>
            </div>
            <div className="h-8 w-px bg-gray-800"></div>
            <div className="flex-1 min-w-[120px]">
              <TypographySmall className="text-gray-500 uppercase mb-1">Severity</TypographySmall>
              <TypographyP className="text-gray-300 font-medium">{issue.severity}</TypographyP>
            </div>
            <div className="h-8 w-px bg-gray-800"></div>
            <div className="flex-1 min-w-[180px]">
              <TypographySmall className="text-gray-500 uppercase mb-1">Location</TypographySmall>
              <TypographyP className="text-gray-300 text-sm">
                {issue.location.endpoint}:{issue.location.line}
              </TypographyP>
            </div>
            <div className="h-8 w-px bg-gray-800"></div>
            <div className="flex-1 min-w-[120px]">
              <TypographySmall className="text-gray-500 uppercase mb-1">Repository</TypographySmall>
              <TypographyP className="text-gray-300 font-medium">{repo}</TypographyP>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12">
          <TypographyH2 className="mb-6 text-gray-300">Description</TypographyH2>
          <div className="">
            <TypographyP className="text-gray-300 leading-relaxed">
              {issue.description}
            </TypographyP>
          </div>
        </div>

        {/* Vulnerable Code */}
        <div className="mb-12">
          <TypographyH2 className="mb-6 text-gray-300">Vulnerable Code</TypographyH2>
          <div className="p-6 bg-gray-950 border border-gray-800 rounded">
            <CodeBlock code={getCodeSnippet(issue)} />
          </div>
        </div>

        {/* Remediation Guide */}
        <div className="mb-12">
          <TypographyH2 className="mb-6 text-gray-300">Remediation Guide</TypographyH2>
          <div className="p-6 bg-gray-950 border border-gray-800 rounded space-y-6">
            <TypographyP className="text-gray-300 leading-relaxed">
              {fixGuidance.description}
            </TypographyP>
            {fixGuidance.fixedCode && (
              <div>
                <TypographyH3 className="mb-3 text-gray-400">Secure Implementation:</TypographyH3>
                <CodeBlock code={fixGuidance.fixedCode} />
              </div>
            )}
          </div>
        </div>



        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-between items-center pt-8 border-t border-gray-800">
          <div className="flex gap-4">
            <Button 
              onClick={handleMarkAsResolved}
              className="px-6 py-3 bg-gray-900 text-white border border-gray-700 hover:bg-gray-800 transition-colors"
              disabled={issue.status === "Resolved"}
            >
              {issue.status === "Resolved" ? "Already Resolved" : "Mark as Resolved"}
            </Button>
          </div>
          
          <Button 
            onClick={handleBackToDashboard}
            className="px-6 py-3 border border-gray-600 text-gray-400 bg-transparent hover:bg-gray-900 hover:text-gray-300 transition-colors"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;
