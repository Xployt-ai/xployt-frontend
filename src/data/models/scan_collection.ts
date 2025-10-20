import type { Vulnerability } from "@/data/models/scan.ts";

export interface ScanCollectionId {
  collection_id: string;
  scan_ids: string[];
}

// {
//   "success": true,
//   "data": {
//   "collection_id": "664e8c4f7f0a8b0012abcd89",
//     "scan_ids": ["664e8c4f7f0a8b0012000001", "664e8c4f7f0a8b0012000002"]
// },
//   "message": "Scan collection started",
//   "timestamp": "2025-10-18T10:00:00Z"
// }

export interface CollectionResults {
  collection_id: string;
  vulnerabilities: Vulnerability[];
}

export interface ScanCollection {
  id: string;
  repository_name?: string;
  scanners: string[];
  scan_ids: string[];
  status: string;
  progress_percent: number;
  created_at?: string;
  finished_at?: string;
}

// id": str(c["_id"]),
// "repository_name": c.get("repository_name"),
//   "scanners": c.get("scanners", []),
//   "scan_ids": c.get("scan_ids", []),
//   "status": c.get("status", "pending"),
//   "progress_percent": int(c.get("progress_percent", 0) or 0),
// "created_at": c.get("created_at"),
//   "finished_at": c.get("finished_at"),