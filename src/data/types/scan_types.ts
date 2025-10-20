import { Cpu, Shield, Zap } from "lucide-react";

export interface ScanTemplate {
  title: string;
  description: string;
  features: string[];
  scan_types: string[]
}

export const templates: ScanTemplate[] = [
  {
    title: "Full Scan",
    description: "Comprehensive security analysis with AI assistance",
    features: ["Static Analysis", "Dynamic Testing", "AI-Powered Review"],
    scan_types: ["static_scanner", "dast_scanner", "llm_scanner", "stat_scanner"]
  },
  {
    title: "No AI Scan",
    description: "Traditional security scanning without AI integration",
    features: ["Static Analysis", "Dynamic Testing", "AI-Powered Review"],
    scan_types: ["static_scanner", "dast_scanner", "stat_scanner"]
  },
  {
    title: "Basic Scan",
    description: "Quick security check for basic vulnerabilities",
    features: ["Static Analysis", "Basic Testing", "Quick Report"],
    scan_types: ["static_scanner", "stat_scanner"]
  },
];

export interface ScanOption {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  details: string[];
  badge?: string;
  scanner: string[]
}

export const options: ScanOption[] = [
  {
    title: "Static Scan",
    description: "Code analysis for security vulnerabilities",
    Icon: Shield,
    details: ["Duration: 5-10 min", "Resource: Low"],
    scanner: ["static_scanner", "stat_scanner"]
  },
  {
    title: "LLM Deep Dive",
    description: "AI-powered security assessment",
    Icon: Cpu,
    details: ["Duration: 15-20 min", "Resource: Medium"],
    scanner: ["llm_scanner"]
  },
  {
    title: "Dynamic Scan",
    description: "Runtime security testing",
    Icon: Zap,
    details: ["Duration: 20-30 min", "Resource: High"],
    scanner: ["dast_scanner"]
  }
];