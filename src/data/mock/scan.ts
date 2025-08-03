export const scan = {
  ScanFindingsMock: [
    {
      severity: "High",
      finding: "SQL Injection Vulnerability",
      url: "/src/pages/login.js",
    },
    {
      severity: "Medium",
      finding: "Cross-Site Scripting (XSS)",
      url: "/src/pages/search.js",
    },
    {
      severity: "Low",
      finding: "Outdated Software Version",
      url: "/src/pages/about.js",
    },
  ],

  ScanIndicatorsMock: [
    ["Pages Scanned", "150/192"],
    ["Vulnerabilities Found", "5"],
    ["Errors", "2"],
  ],

  ScanStepsMock: [
    {label: "Basic Scan", status: "Done", color: "green"},
    {label: "Deep Static Analysis", status: "Ongoing", color: "yellow"},
    {label: "Runtime Behavior Scan", status: "Queued", color: "red"},
  ]

}