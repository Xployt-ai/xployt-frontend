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