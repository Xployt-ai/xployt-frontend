export interface Scan {
  id: string;
  repository_name: string;
  scanner_name: string;
  configurations: {
    [key: string]: any;
  }
  progress_percent: number;
  progress_text: string;
  user_id: string;
  created_at: string;
  finished_at: string;
}

// "repository_name": "string",
//   "scanner_name": "string",
//   "configurations": {
//   "additionalProp1": {}
// },
// "status": "pending",
//   "progress_percent": 0,
//   "progress_text": "Initializing...",
//   "id": "string",
//   "user_id": "string",
//   "created_at": "2025-07-21T12:52:05.282Z",
//   "finished_at": "2025-07-21T12:52:05.282Z"

export interface ScanProgress {
  scan_id: string;
  status: string;
  progress_percent: number;
  progress_text: string;
}

// "scan_id": "string",
//   "status": "string",
//   "progress_percent": 0,
//   "progress_text": "string"

export interface ScanResult {
  type: string;
  severity: string;
  description: string;
  location: {
    [key: string]: any;
  };
  metadata: {
    [key: string]: any;
  };
  id: string;
  scan_id: string;
  created_at: string;
  status?: string;
}

// "type": "string",
//   "severity": "string",
//   "description": "string",
//   "location": {
//   "additionalProp1": {}
// },
// "metadata": {
//   "additionalProp1": {}
// },
// "id": "string",
//   "scan_id": "string",
//   "created_at": "2025-07-21T20:53:57.790Z"

// To be integrated with the backend
export interface newScanProps {
  repository_name: string;
  branch: string;
  root_directory: string;
  build_command: string;
  output_directory: string;
  install_command?: string;
  env_variables?: Array<{ key: string; value: string }>;
}

export interface ScanFinding{
  severity: string;
  finding: string;
  url: string;
  id?: string;
  scan_id?: string;
  created_at?: string;
  status?: string;
}

export interface ScanStep {
  label: string;
  status: string;
  color: string;
}

export interface ScanIndicator {
  label: string;
  status: string;
  color: string;
}